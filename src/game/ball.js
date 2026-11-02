import { FIELD_WIDTH, FIELD_HEIGHT } from './paddles.js';

export const BALL_RADIUS = 8;
export const BALL_SPEED = 320;
export const BALL_MAX_SPEED = 650;
export const BALL_ACCELERATION = 1.05;
export const BALL_MAX_ANGLE = Math.PI / 3;

export function createBall ()
{
    const angle = Math.PI / 12;

    return {
        x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2,
        vx: BALL_SPEED * Math.cos(angle), vy: -BALL_SPEED * Math.sin(angle),
        active: true
    };
}

// Swept front-face contacts: consume time up to each collision, then advance
// the remaining time with the new velocity. This also handles long frames.
export function advanceBall (state, delta, leftPaddle, rightPaddle)
{
    const ball = { ...state };

    if (!ball.active || delta <= 0)
    {
        return ball;
    }

    let remaining = delta / 1000;

    while (remaining > 0)
    {
        let time = remaining;
        let contact = null;

        const consider = (candidateTime, candidate) => {
            if (candidateTime >= 0 && candidateTime <= time)
            {
                time = candidateTime;
                contact = candidate;
            }
        };

        if (ball.vy < 0)
        {
            consider((BALL_RADIUS - ball.y) / ball.vy, { type: 'wall', y: BALL_RADIUS });
        }
        else if (ball.vy > 0)
        {
            consider((FIELD_HEIGHT - BALL_RADIUS - ball.y) / ball.vy, {
                type: 'wall', y: FIELD_HEIGHT - BALL_RADIUS
            });
        }

        const paddle = ball.vx < 0 ? leftPaddle : rightPaddle;
        const outgoing = ball.vx < 0 ? 1 : -1;

        if (paddle && ball.vx !== 0)
        {
            const face = paddle.x + outgoing * (paddle.width / 2 + BALL_RADIUS);
            // Resolve an incoming initial overlap once, never a departing ball.
            const overlapsFront = outgoing * (ball.x - paddle.x) >= 0
                && outgoing * (ball.x - face) < 0;
            const hitTime = overlapsFront ? 0 : (face - ball.x) / ball.vx;
            const hitY = ball.y + ball.vy * hitTime;

            if (Math.abs(hitY - paddle.y) <= paddle.height / 2 + BALL_RADIUS)
            {
                consider(hitTime, { type: 'paddle', paddle, face, outgoing });
            }
        }

        ball.x += ball.vx * time;
        ball.y += ball.vy * time;
        remaining -= time;

        if (!contact)
        {
            break;
        }

        if (contact.type === 'wall')
        {
            ball.y = contact.y;
            ball.vy = -ball.vy;
        }
        else
        {
            const relative = Math.max(-1, Math.min(1,
                (ball.y - contact.paddle.y) / (contact.paddle.height / 2)));
            const angle = relative * BALL_MAX_ANGLE;
            const speed = Math.min(BALL_MAX_SPEED, Math.hypot(ball.vx, ball.vy) * BALL_ACCELERATION);

            ball.x = contact.face;
            ball.vx = contact.outgoing * speed * Math.cos(angle);
            ball.vy = speed * Math.sin(angle);
        }
    }

    if (ball.x + BALL_RADIUS < 0 || ball.x - BALL_RADIUS > FIELD_WIDTH)
    {
        ball.active = false;
    }

    return ball;
}
