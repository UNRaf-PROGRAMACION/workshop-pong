import { Scene } from 'phaser';
import {
    FIELD_WIDTH, FIELD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT,
    PADDLE_MARGIN, movePaddle
} from '../paddles';
import { BALL_RADIUS, createBall, advanceBall } from '../ball.js';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        for (let y = 8; y < FIELD_HEIGHT; y += 24)
        {
            this.add.rectangle(FIELD_WIDTH / 2, y, 2, 12, 0x444444);
        }

        const inset = PADDLE_MARGIN + PADDLE_WIDTH / 2;

        this.leftPaddle = this.add.rectangle(inset, FIELD_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 0xffffff);
        this.rightPaddle = this.add.rectangle(FIELD_WIDTH - inset, FIELD_HEIGHT / 2, PADDLE_WIDTH, PADDLE_HEIGHT, 0xffffff);
        this.ballState = createBall();
        this.ball = this.add.circle(this.ballState.x, this.ballState.y, BALL_RADIUS, 0xffffff);

        const textStyle = {
            fontFamily: 'monospace', fontSize: 20, color: '#ffffff', align: 'center'
        };

        this.add.text(200, 24, 'JUGADOR 1\nW / S', textStyle).setOrigin(0.5, 0);
        this.add.text(600, 24, 'JUGADOR 2\n↑ / ↓', textStyle).setOrigin(0.5, 0);
        this.focusHint = this.add.text(400, 570, 'Clic en el campo para controlar las paletas', {
            ...textStyle, fontSize: 16, backgroundColor: '#000000'
        }).setOrigin(0.5);

        const canvas = this.game.canvas;
        const pressed = new Set();
        const controlCodes = new Set(['KeyW', 'KeyS', 'ArrowUp', 'ArrowDown', 'Space']);

        this.pressed = pressed;
        canvas.tabIndex = 0;
        canvas.setAttribute('aria-label', 'PONG. Jugador 1: W y S. Jugador 2: flechas arriba y abajo.');

        const onKeyDown = (event) => {
            if (controlCodes.has(event.code))
            {
                event.preventDefault();
                pressed.add(event.code);
            }
        };
        const onKeyUp = (event) => {
            if (controlCodes.has(event.code))
            {
                event.preventDefault();
                pressed.delete(event.code);
            }
        };
        const onBlur = () => {
            pressed.clear();
            this.focusHint.setVisible(true);
        };
        const onFocus = () => this.focusHint.setVisible(false);
        const onPointerDown = () => canvas.focus({ preventScroll: true });

        canvas.addEventListener('keydown', onKeyDown);
        canvas.addEventListener('keyup', onKeyUp);
        canvas.addEventListener('blur', onBlur);
        canvas.addEventListener('focus', onFocus);
        canvas.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('blur', onBlur);

        this.events.once('shutdown', () => {
            canvas.removeEventListener('keydown', onKeyDown);
            canvas.removeEventListener('keyup', onKeyUp);
            canvas.removeEventListener('blur', onBlur);
            canvas.removeEventListener('focus', onFocus);
            canvas.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('blur', onBlur);
            pressed.clear();
        });
    }

    update (time, delta)
    {
        let remaining = delta;

        while (remaining > 0)
        {
            const step = Math.min(remaining, 1000 / 120);

            this.leftPaddle.y = movePaddle(this.leftPaddle.y, this.pressed.has('KeyW'), this.pressed.has('KeyS'), step);
            this.rightPaddle.y = movePaddle(this.rightPaddle.y, this.pressed.has('ArrowUp'), this.pressed.has('ArrowDown'), step);
            this.ballState = advanceBall(this.ballState, step, this.leftPaddle, this.rightPaddle);
            remaining -= step;
        }

        this.ball.setPosition(this.ballState.x, this.ballState.y);
        this.ball.setVisible(this.ballState.active);
    }
}
