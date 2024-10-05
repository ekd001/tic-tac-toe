import { configApp } from '@adonisjs/eslint-config'

const updatedConfig = {
    ...configApp,
    rules: {
        ...configApp.rules,
        'no-console': 'off',
        'no-unused-vars': 'on',
    },
    "compilerOptions": {
        "noUnusedLocals": false
    }
}
export default updatedConfig()
