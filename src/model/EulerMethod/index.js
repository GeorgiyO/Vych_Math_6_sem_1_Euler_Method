export {eulerMethod, eulerMethodSecondOrder};

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
    let prev;
    for (let i = 0; i < iterations; i++) {
        prev = values.last();
        values.push({
            x: prev.x + h,
            y: prev.y + h * foo(prev.x, prev.y)
        });
    }
    return values;
}

/**
 * z = y'
 * @param x0            - аргумент foo(t0)
 * @param y0            - значение foo'(t0)
 * @param z0            - значение foo(t0)
 * @param h             - шаг итерации
 * @param n             - количество итераций
 * @param f             - функция f(t, x, y)
 * @returns [{x, y}]
 */
let eulerMethodSecondOrder = (x0, y0, z0, h, n, f) => {
    let values = [{
        x: x0,
        y: y0,
        z: z0
    }];
    for (let i = 0; i < n; i++) {
        let prev = values.last();
        values.push({
            x: prev.x + h,
            y: prev.y + h * prev.z,
            z: prev.z + h * f(prev.x, prev.y, prev.z)
        });
    }
    return values;
}