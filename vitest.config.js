import { defineConfig } from 'vitest/config'
import * as path from 'path'
export default defineConfig({

    test: {
        enviroment: 'jsdom',
    },
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }]
    }
})