import "./components/NewToken.js";
import "./components/Login.js";
import "./components/NewPassword.js";
import "./components/NewPost.js";
import "./components/Home.js";
import "./components/ViewNotFound.js";
import "./service/Notifications.js";
import "./service/Constants.js";

import { Router } from '../deps/vaadin-router.js';

const outlet = document.querySelector('output');
const router = new Router(outlet);
router.setRoutes([
    { path: '/', component: 'x-home-view' },
    { path: '/posts', component: 'x-posts-new' },
    { path: '/passwords', component: 'x-passwords-new' },
    { path: '/login', component: 'x-login-view' },
]);