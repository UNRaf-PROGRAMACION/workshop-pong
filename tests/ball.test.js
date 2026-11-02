import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
    BALL_RADIUS, BALL_MAX_SPEED, BALL_MAX_ANGLE, createBall, advanceBall
} from '../src/game/ball.js';

const left = { x: 40, y: 300, width: 16, height: 100 };
const right = { x: 760, y: 300, width: 16, height: 100 };
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);
const speed = ball => Math.hypot(ball.vx, ball.vy);
const state = (values = {}) => ({ x: 400, y: 300, vx: 320, vy: 0, active: true, ...values });

test('radio 8 y estado inicial a rapidez 320, centro y dirección del GDD', () => {
    const ball = createBall();
    assert.equal(BALL_RADIUS, 8);
    assert.equal(ball.x, 400);
    assert.equal(ball.y, 300);
    near(speed(ball), 320);
    near(Math.atan2(ball.vy, ball.vx), -Math.PI / 12);
});

test('techo y suelo invierten solo vy y conservan rapidez', () => {
    for (const [y, vy] of [[10, -200], [590, 200]])
    {
        const input = state({ y, vx: 300, vy });
        const ball = advanceBall(input, 20, left, right);
        assert.equal(ball.vx, 300);
        assert.equal(ball.vy, -vy);
        near(speed(ball), speed(input));
        assert.ok(ball.y >= 8 && ball.y <= 592);
    }
});

for (const [label, paddle, direction, face] of [['izquierda', left, -1, 56], ['derecha', right, 1, 744]])
{
    test(`devolución central de paleta ${label} a 336 unidades/s`, () => {
        const ball = advanceBall(state({ x: face - direction * 10, vx: direction * 320 }), 40, left, right);
        near(ball.vx, -direction * 336);
        near(ball.vy, 0);
        near(speed(ball), 336);
    });

    test(`ángulos crecientes y limitados en paleta ${label}`, () => {
        for (const sign of [-1, 1])
        {
            let previous = 0;

            for (const offset of [10, 25, 50, 57])
            {
                const ball = advanceBall(state({ x: face, y: 300 + sign * offset, vx: direction * 320 }), 1, left, right);
                const angle = Math.atan2(ball.vy, Math.abs(ball.vx));
                assert.equal(Math.sign(angle), sign);
                assert.ok(Math.abs(angle) >= previous);
                assert.ok(Math.abs(angle) <= BALL_MAX_ANGLE + 1e-8);
                near(angle, sign * Math.min(offset / 50, 1) * BALL_MAX_ANGLE);
                previous = Math.abs(angle);
            }
        }
    });

    test(`solapamiento entrante y separación sin impactos repetidos en ${label}`, () => {
        const ball = advanceBall(state({ x: face + direction * 4, vx: direction * 320 }), 1, left, right);
        near(speed(ball), 336);
        const after = advanceBall(ball, 1, left, right);
        near(speed(after), 336);
        assert.ok((after.x - ball.x) * -direction > 0);
        const departing = advanceBall(state({ x: face + direction * 4, vx: -direction * 320 }), 1, left, right);
        near(speed(departing), 320);
    });

    for (const fps of [30, 60, 120])
    {
        test(`sin atravesar paleta ${label} a 650 y ${fps} pasos/s, centro y extremos`, () => {
            for (const offset of [-50, 0, 50])
            {
                const ball = advanceBall(state({ x: face - direction * 1, y: 300 + offset, vx: direction * 650 }), 1000 / fps, left, right);
                assert.ok(ball.vx * direction < 0);
                assert.ok((ball.x - face) * -direction > 0);
                near(speed(ball), 650);
            }
        });
    }
}

test('aceleraciones sucesivas hasta tope 650', () => {
    let currentSpeed = 320;

    for (let i = 0; i < 25; i++)
    {
        const ball = advanceBall(state({ x: 744, vx: currentSpeed }), 1, left, right);
        near(speed(ball), Math.min(650, currentSpeed * 1.05));
        currentSpeed = speed(ball);
    }

    near(currentSpeed, BALL_MAX_SPEED);
});

test('delta grande atraviesa el plano de paleta pero la colisión se resuelve antes', () => {
    const ball = advanceBall(state({ x: 700, vx: 650 }), 200, left, right);
    assert.ok(ball.vx < 0);
    near(ball.x, 658);
    near(speed(ball), 650);
});

test('paredes fiables a rapidez máxima con varios impactos en un paso grande', () => {
    const ball = advanceBall(state({ vx: 0, vy: 650 }), 3000, null, null);
    // 292 to the floor, two full 584-unit crossings, then 490 upward.
    near(ball.y, 102);
    near(ball.vy, -650);
    near(speed(ball), 650);
});

for (const fps of [30, 60, 120])
{
    test(`paredes a rapidez máxima, ${fps} pasos/s y tres segundos`, () => {
        for (const direction of [-1, 1])
        {
            let ball = state({ vx: 0, vy: direction * 650 });

            for (let i = 0; i < fps * 3; i++)
            {
                ball = advanceBall(ball, 1000 / fps, null, null);
                assert.ok(ball.y >= 8 && ball.y <= 592);
                near(speed(ball), 650);
            }

            near(ball.y, direction > 0 ? 102 : 498);
        }
    });
}

test('colisión simultánea junto al techo no atrapa la pelota ni repite aceleración', () => {
    const raised = { ...right, y: 50 };
    const ball = advanceBall(state({ x: 744, y: 8, vx: 320 }), 10, left, raised);
    assert.ok(ball.vx < 0 && ball.vy > 0);
    assert.ok(ball.y >= 8);
    near(speed(ball), 336);
});

test('sale por ambos laterales sin rebote ni reinicio y se desactiva al salir completa', () => {
    for (const direction of [-1, 1])
    {
        const ball = advanceBall(state({ y: 100, vx: direction * 650 }), 1000, left, right);
        assert.equal(ball.active, false);
        assert.equal(ball.vx, direction * 650);
        assert.ok(direction < 0 ? ball.x < -8 : ball.x > 808);
        assert.deepEqual(advanceBall(ball, 1000, left, right), ball);
    }

    assert.equal(advanceBall(state({ x: 0, y: 100, vx: -320 }), 10, left, right).active, true);
});

test('30, 60 y 120 pasos/s producen el mismo intercambio con paletas estáticas', () => {
    const results = [30, 60, 120].map(fps => {
        let ball = state({ x: 400, vx: 650 });

        for (let i = 0; i < fps * 3; i++)
        {
            ball = advanceBall(ball, 1000 / fps, left, right);
        }

        return ball;
    });

    for (const ball of results.slice(1))
    {
        near(ball.x, results[0].x);
        near(ball.y, results[0].y);
        near(ball.vx, results[0].vx);
    }
});

test('la función no muta el estado de entrada ni avanza con delta cero', () => {
    const input = Object.freeze(createBall());
    assert.deepEqual(advanceBall(input, 0, left, right), input);
    assert.notDeepEqual(advanceBall(input, 10, left, right), input);
});
