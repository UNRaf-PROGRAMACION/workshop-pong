export const FIELD_WIDTH = 800;
export const FIELD_HEIGHT = 600;
export const PADDLE_WIDTH = 16;
export const PADDLE_HEIGHT = 100;
export const PADDLE_MARGIN = 32;
export const PADDLE_SPEED = 420;

export function movePaddle (y, up, down, delta)
{
    const direction = Number(down) - Number(up);
    const nextY = y + direction * PADDLE_SPEED * delta / 1000;

    return Math.max(PADDLE_HEIGHT / 2, Math.min(FIELD_HEIGHT - PADDLE_HEIGHT / 2, nextY));
}
