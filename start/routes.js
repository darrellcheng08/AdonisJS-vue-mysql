'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

const Route = use('Route')

// DISPLAYING OF LOGIN PAGE
Route.on('/').render('auth.login').middleware(['guest'])
Route.on('/login').render('auth.login').middleware(['guest'])

// LOGIN AND LOGOUT CONTROLLER ROUTES
Route.post('/login', 'LoginController.login')
Route.get('/logout', 'LoginController.logout')

// CONTROLLER ROUTES
Route.group(() => {
    Route.get('/products', 'ProductController.get')
    Route.get('/search', 'ProductController.search')
}).prefix('api').middleware(['auth'])

Route.any('*', ({ view }) => view.render('admin.dashboard'))