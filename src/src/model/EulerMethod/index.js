export {eulerMethod, eulerMethodSecondOrder};

let nextY = (x, y, h, foo) => y + h * foo(x, y);

/**
 * @param x0            - начальное значение х аргумента foo(x)
 * @param y0            - начальное значение у значения foo(x0)
 * @param h             - шаг итерации
 * @param iterations    - количество итераций
 * @param foo           - функция f(x, y)
 * @returns [{x, y}]
 */
let eulerMethod = (x0, y0, h, iterations, foo) => {
    let values = [{
        x: x0,
        y: y0
    }];
    let xi = x0;
    let yi = y0;
    let prev;
    for (let i = 0; i < iterations; i++) {
        prev = values.last();
        xi = prev.x + h;
        yi = prev.y + h * foo(prev.x, prev.y);
        values.push({
            x: xi,
            y: yi
        })
    }
    return values;
}

/**
 * y = x'
 * @param t0            - начальное значение t0 аргумента foo(t0)
 * @param y0            - начальное значение y0 значение foo'(t0)
 * @param x0            - начальное значение x0 значения foo(t0)
 * @param h             - шаг итерации
 * @param iterations    - количество итераций
 * @param foo           - функция f(t, x, y)
 * @returns [{x, y}]
 */
let eulerMethodSecondOrder = (t0, y0, x0, h, iterations, foo) => {
    let values = [{
        t: t0,
        x: x0,
        y: y0
    }];
    let ti = t0;
    let xi = x0;
    let yi = y0;
    for (let i = 0; i < iterations; i++) {
        let prev = values.last();
        ti = prev.t + h;
        xi = prev.x + prev.y * h;
        yi = prev.y + foo(prev.t, prev.x, prev.y) * h;
        values.push({
            t: ti,
            x: xi,
            y: yi
        });
    }
    return values;
}