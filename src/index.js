import createApp from './mint'
import axios from 'axios'

import router from './router'
// const app = createApp({
//   extraReducers: {
//     form: reduxFormReducer
//   }
// })
const app = createApp()
// app.model()
app.router(router)
axios.defaults.withCredentials = true

app.start('app')
