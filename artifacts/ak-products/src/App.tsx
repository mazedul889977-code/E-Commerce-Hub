import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { CartProvider } from '@/context/CartContext';
import { HomeContentProvider } from '@/context/HomeContentContext';
import { ProductProvider } from '@/context/ProductContext';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import CategoryPage from '@/pages/CategoryPage';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Admin from '@/pages/Admin';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Account from '@/pages/Account';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Terms from '@/pages/Terms';
import RefundPolicy from '@/pages/RefundPolicy';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      
      <Route path="/kitchen">
        {() => (
          <CategoryPage 
            category="kitchen" 
            title="Smart Kitchen" 
            description="Premium kitchen gadgets and electronics designed for efficiency and style."
          />
        )}
      </Route>
      
      <Route path="/household">
        {() => (
          <CategoryPage 
            category="household" 
            title="Household Essentials" 
            description="Practical tools and essentials to keep your home organized and clean."
          />
        )}
      </Route>
      
      <Route path="/electronic">
        {() => (
          <CategoryPage 
            category="electronic" 
            title="Smart Home Electronics" 
            description="Innovative electronics that automate and secure your home environment."
          />
        )}
      </Route>
      
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/owner-console-889977" component={Admin} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/account" component={Account} />
      
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/refund-policy" component={RefundPolicy} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <HomeContentProvider>
          <CartProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </HomeContentProvider>
      </ProductProvider>
    </QueryClientProvider>
  );
}

export default App;
