import { plugin as analyze } from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'src/index.js',
        output: {
            sourcemap: true,
            name: 'YourLibraryName',
            file: pkg.browser,
            format: 'umd',
            globals: {}
        },
        external: [],
        plugins: [
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs({
                include: 'node_modules/**'
            }),
            babel({
                comments: false,
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            uglify({
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console: true,
                    dead_code: true,
                    if_return: true,
                    conditionals: true,
                    drop_debugger: true,
                    loops: true,
                    reduce_vars: true
                },
                sourceMap: true,
                warnings: false
            }),
            analyze()
        ]
    },
    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // the `output` option which can specify `file` and `format`)
    {
        input: 'src/index.js',
        output: {
            sourcemap: true,
            file: pkg.main,
            format: 'cjs'
        },
        external: [],
        plugins: [
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs({
                include: 'node_modules/**'
            }),
            babel({
                comments: false,
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            uglify({
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console: true,
                    dead_code: true,
                    if_return: true,
                    conditionals: true,
                    drop_debugger: true,
                    loops: true,
                    reduce_vars: true
                },
                sourceMap: true,
                warnings: false
            }),
            analyze()
        ]
    },
    {
        input: 'src/index.js',
        output: {
            sourcemap: true,
            file: pkg.module,
            format: 'es'
        },
        external: [],
        plugins: [
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs({
                include: 'node_modules/**'
            }),
            babel({
                comments: false,
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            analyze()
        ]
    }
];
