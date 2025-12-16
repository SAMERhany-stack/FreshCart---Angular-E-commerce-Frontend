import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';


export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: 'full' },

    {
        path: "",
        component: AuthLayoutComponent,
        canActivate:[logedGuard],
        children: [
            { 
                path: "login",
                title: "Login",
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            { 
                path: "register",
                title: "Register",
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
            },
            { 
                path: "forgetpassword",
                title: "forgetpassword",
                loadComponent: () => import('./pages/forgetpassword/forgetpassword.component').then(m => m.ForgetpasswordComponent)
            },
        ]
    },

    {
        path: "",
        component: BlankLayoutComponent,
        canActivate:[authGuard],
        children: [
            { 
                path: "home",
                title: "Home",
                loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
            },
            { 
                path: "cart",
                title: "Cart",
                loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
            },
            { 
                path: "products",
                title: "Products",
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            { 
                path: "brands",
                title: "Brands",
                loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent)
            },
            { 
                path: "categories",
                title: "Categories",
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            },
            { 
                path: "checkout/:id",
                title: "Checkout",
                loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                data: { renderMode: 'client' }
            },
            { 
                path: "details/:id",
                title: "details",
                loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent)
            },
            { 
                path: "specific-category/:_id",
                title: "specific-category",
                loadComponent: () => import('./pages/specific-category/specific-category.component').then(m => m.SpecificCategoryComponent),
                data: { renderMode: 'client' }
            },
            { 
                path: "brands-detailes/:_id",
                title: "brands-detailes",
                loadComponent: () => import('./pages/brands-detailes/brands-detailes.component').then(m => m.BrandsDetailesComponent)
            },
            { 
                path: "allorders",
                title: "allorders",
                loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent)
            },
            { 
                path: "**",
                title: "NotFound",
                loadComponent: () => import('./pages/notfound/notfound.component').then(m => m.NotfoundComponent)
            },
            
            
            
        ]
    }
];
