/**
 * Created by Luan on 10/21/2016.
 */
import {combineReducers} from 'redux'
import routes from './routes'
import Category from './Category/index'
import Product from './Product/index'
import Cart from './Cart/index'
import WishList from './WishList/index'
import Customer from './Customer/index'
import Language from './Language/index'
import Country from './Country/index'
// ... other reducers


export default combineReducers({
    routes,
    Category,
    Product,
    Cart,
    WishList,
    Customer,
    Language,
    Country,
    // ... other reducers
})