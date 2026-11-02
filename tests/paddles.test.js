import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
    FIELD_WIDTH, FIELD_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT,
    PADDLE_MARGIN, movePaddle
} from '../src/game/paddles.js';

test('campo y paletas simétricas con margen exterior de 32', () => {
    assert.equal(FIELD_WIDTH, 800);
    assert.equal(FIELD_HEIGHT, 600);
    assert.equal(PADDLE_WIDTH, 16);
    assert.equal(PADDLE_HEIGHT, 100);
    const inset = PADDLE_MARGIN + PADDLE_WIDTH / 2;
    assert.equal(inset - PADDLE_WIDTH / 2, 32);
    assert.equal(FIELD_WIDTH - (FIELD_WIDTH - inset + PADDLE_WIDTH / 2), 32);
});

test('direcciones, detención y teclas opuestas', () => {
    assert.equal(movePaddle(300, true, false, 100), 258);
    assert.equal(movePaddle(300, false, true, 100), 342);
    assert.equal(movePaddle(300, false, false, 100), 300);
    assert.equal(movePaddle(300, true, true, 100), 300);
    assert.equal(movePaddle(300, false, true, 100), 342);
});

test('cuatro combinaciones simultáneas independientes', () => {
    for (const leftUp of [true, false])
    {
        for (const rightUp of [true, false])
        {
            const left = movePaddle(300, leftUp, !leftUp, 100);
            const right = movePaddle(300, rightUp, !rightUp, 100);
            assert.equal(left, leftUp ? 258 : 342);
            assert.equal(right, rightUp ? 258 : 342);
        }
    }
});

test('paletas completas dentro del campo incluso ante un delta grande', () => {
    assert.equal(movePaddle(300, true, false, 10000), 50);
    assert.equal(movePaddle(300, false, true, 10000), 550);
    assert.equal(movePaddle(50, true, false, 100), 50);
    assert.equal(movePaddle(550, false, true, 100), 550);
});

for (const fps of [30, 60, 120])
{
    test(`420 unidades en un segundo a ${fps} actualizaciones/s sin alcanzar bordes`, () => {
        let y = 50;

        for (let frame = 0; frame < fps; frame++)
        {
            y = movePaddle(y, false, true, 1000 / fps);
        }

        assert.ok(Math.abs(y - 470) < 1e-8);
    });
}
