import React, { useMemo, useState } from "react";
import { ShoppingCart, ArrowLeft, Search, Heart, MapPin, CreditCard, Package, CheckCircle2, Truck, User, Star, Plus, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PRODUCTS = [
    {
        id: 1,
        name: "Pro Edge Paddle",
        price: 1427,
        oldPrice: 1585,
        rating: 4.7,
        sold: 826,
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
        description:
            "Lightweight sports paddle with durable core, soft grip, and balanced control for everyday play.",
        variations: ["Black", "Blue", "Red"],
    },
    {
        id: 2,
        name: "Travel Bottle Set",
        price: 399,
        oldPrice: 499,
        rating: 4.6,
        sold: 234,
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1200&auto=format&fit=crop",
        description:
            "Portable bottle set for school, work, and travel. Clean design and easy to carry.",
        variations: ["White", "Green", "Gray"],
    },
    {
        id: 3,
        name: "Wireless Earbuds",
        price: 899,
        oldPrice: 1099,
        rating: 4.8,
        sold: 512,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=1200&auto=format&fit=crop",
        description:
            "Clear sound, compact case, and easy touch controls for daily listening.",
        variations: ["Black", "White"],
    },
];

const PAYMENT_METHODS = ["GCash", "Maya", "Card", "Cash on Delivery"];
const TRACKING_STEPS = ["Order", "Payment", "Dispatch", "Delivery", "Review"];

function Peso({ value }) {
    return <span>₱{ value.toLocaleString() } </span>;
}

function Header({ title, onBack, right }) {
    return (
        <div className= "sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 px-4 py-3 backdrop-blur" >
        <div className="w-10" >
            {
                onBack?(
          <button onClick = { onBack } className = "rounded-full p-2 hover:bg-slate-100" >
                        <ArrowLeft className="h-5 w-5" />
            </button>
        ) : null
}
</div>
    < h1 className = "text-lg font-semibold" > { title } < /h1>
        < div className = "w-10 flex justify-end" > { right } < /div>
            < /div>
  );
}

function LoginScreen({ onContinue }) {
    return (
        <div className= "flex min-h-screen flex-col bg-white" >
        <div className="bg-orange-600 px-6 pb-12 pt-10 text-white" >
            <div className="mx-auto max-w-sm" >
                <div className="mb-6 text-3xl font-bold" > ShopGo < /div>
                    < p className = "text-sm text-orange-50" > Smart shopping with fast checkout and simple order tracking.< /p>
                        < div className = "mt-8 rounded-3xl bg-orange-500/50 p-6 text-center shadow-lg" >
                            <Package className="mx-auto mb-3 h-16 w-16" />
                                <p className="text-xl font-semibold" > Mobile Ordering Prototype < /p>
                                    < /div>
                                    < /div>
                                    < /div>

                                    < div className = "mx-auto flex w-full max-w-sm flex-1 flex-col gap-4 px-6 py-8" >
                                        <Button className="h-12 rounded-full bg-white text-slate-900 border border-slate-300 hover:bg-slate-50" onClick = { onContinue } >
                                            Continue with Google
                                            < /Button>
                                            < Button className = "h-12 rounded-full bg-blue-600 hover:bg-blue-700" onClick = { onContinue } >
                                                Continue with Facebook
                                                < /Button>
                                                < Button variant = "outline" className = "h-12 rounded-full border-orange-500 text-orange-600 hover:bg-orange-50" onClick = { onContinue } >
                                                    Continue with Email
                                                    < /Button>
                                                    < button onClick = { onContinue } className = "mt-4 text-sm text-slate-500 underline underline-offset-4" >
                                                        Continue as Guest
                                                        < /button>
                                                        < /div>
                                                        < /div>
  );
}

function HomeScreen({ products, onOpenProduct, onOpenCart, cartCount }) {
    return (
        <div className= "min-h-screen bg-slate-50" >
        <div className="sticky top-0 z-10 bg-white px-4 pb-4 pt-4 shadow-sm" >
            <div className="mx-auto max-w-sm" >
                <div className="mb-3 flex items-center justify-between" >
                    <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-orange-500" > ShopGo < /p>
                        < h2 className = "text-xl font-bold text-slate-900" > Find what you need < /h2>
                            < /div>
                            < button onClick = { onOpenCart } className = "relative rounded-full border bg-white p-2 shadow-sm" >
                                <ShoppingCart className="h-5 w-5" />
                                    { cartCount > 0 ? (
                                        <span className= "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white" >
                                        { cartCount }
                                < /span>
              ) : null
}
</button>
    < /div>
    < div className = "flex items-center gap-2 rounded-full bg-slate-100 px-4 py-3" >
        <Search className="h-4 w-4 text-slate-500" />
            <Input placeholder="Search products" className = "border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" />
                </div>
                < /div>
                < /div>

                < div className = "mx-auto max-w-sm px-4 py-4" >
                    <div className="mb-4 grid grid-cols-4 gap-2 text-center text-xs" >
                    {
                        ['Sports', 'Gadgets', 'Lifestyle', 'Deals'].map((item) => (
                            <div key= { item } className = "rounded-2xl bg-white p-3 shadow-sm" >
                            <div className="mb-2 mx-auto h-10 w-10 rounded-full bg-orange-100" />
                            <p>{ item } < /p>
                        < /div>
                        ))
                    }
                        < /div>

                        < Card className = "mb-4 overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-lg" >
                            <CardContent className="p-5" >
                                <p className="text-sm" > Special offer < /p>
                                    < h3 className = "mt-1 text-2xl font-bold" > Save more on your first order < /h3>
                                        < p className = "mt-2 text-sm text-orange-50" > Mobile - friendly prototype inspired by modern shopping apps.< /p>
                                            < /CardContent>
                                            < /Card>

                                            < div className = "space-y-4" >
                                            {
                                                products.map((product) => (
                                                    <Card key= { product.id } className = "overflow-hidden rounded-3xl border-0 shadow-sm" >
                                                    <CardContent className="p-0" >
                                                <img src={ product.image } alt = { product.name } className = "h-44 w-full object-cover" />
                                                <div className="p-4" >
                                                <h3 className="line-clamp-2 font-semibold text-slate-900" > { product.name } < /h3>
                                                < div className = "mt-2 flex items-center gap-2 text-sm text-slate-500" >
                                                <Star className="h-4 w-4 fill-current text-amber-400" />
                                                <span>{ product.rating } < /span>
                                                <span>•</span>
                                                < span > { product.sold } sold < /span>
                                                < /div>
                                                < div className = "mt-3 flex items-end justify-between" >
                                                <div>
                                                <p className="text-xl font-bold text-orange-600" > <Peso value={ product.price } /> </p>
                                                < p className = "text-sm text-slate-400 line-through" > <Peso value={ product.oldPrice } /> </p>
                                                < /div>
                                                < Button className = "rounded-full bg-orange-600 hover:bg-orange-700" onClick = {() => onOpenProduct(product)} >
                                                View
                                                < /Button>
                                                < /div>
                                                < /div>
                                                < /CardContent>
                                                < /Card>
          ))}
</div>
    < /div>
    < /div>
  );
}

function ProductScreen({ product, onBack, onAddToCart, onGoCart }) {
    const [quantity, setQuantity] = useState(1);
    const [variation, setVariation] = useState(product.variations[0]);

    return (
        <div className= "min-h-screen bg-white" >
        <Header
        title="Product Details"
    onBack = { onBack }
    right = {< button onClick = { onGoCart } > <ShoppingCart className="h-5 w-5" /> </button>}
        />

        <div className="mx-auto max-w-sm pb-28" >
            <img src={ product.image } alt = { product.name } className = "h-80 w-full object-cover" />
                <div className="p-4" >
                    <div className="mb-3 flex items-start justify-between gap-3" >
                        <div>
                        <p className="text-2xl font-bold text-orange-600" > <Peso value={ product.price } /></p >
                            <p className="text-sm text-slate-400 line-through" > <Peso value={ product.oldPrice } /></p >
                                </div>
                                < button className = "rounded-full border p-2" > <Heart className="h-5 w-5" /> </button>
                                    < /div>

                                    < h2 className = "text-lg font-semibold text-slate-900" > { product.name } < /h2>
                                        < div className = "mt-2 flex items-center gap-2 text-sm text-slate-500" >
                                            <Star className="h-4 w-4 fill-current text-amber-400" />
                                                <span>{ product.rating } < /span>
                                                <span>•</span>
                                                    < span > { product.sold } sold < /span>
                                                        < /div>

                                                        < p className = "mt-4 text-sm leading-6 text-slate-600" > { product.description } < /p>

                                                            < div className = "mt-6" >
                                                                <p className="mb-2 font-medium" > Variation < /p>
                                                                    < div className = "flex flex-wrap gap-2" >
                                                                    {
                                                                        product.variations.map((item) => (
                                                                            <button
                  key= { item }
                  onClick = {() => setVariation(item)}
    className = {`rounded-full border px-4 py-2 text-sm ${variation === item ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-slate-200 text-slate-700'}`
}
                >
    { item }
    < /button>
              ))}
</div>
    < /div>

    < div className = "mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-3" >
        <span className="font-medium" > Quantity < /span>
            < div className = "flex items-center gap-3" >
                <button onClick={ () => setQuantity((q) => Math.max(1, q - 1)) } className = "rounded-full border p-2" > <Minus className="h-4 w-4" /> </button>
                    < span className = "w-6 text-center font-semibold" > { quantity } < /span>
                        < button onClick = {() => setQuantity((q) => q + 1)} className = "rounded-full border p-2" > <Plus className="h-4 w-4" /> </button>
                            < /div>
                            < /div>
                            < /div>
                            < /div>

                            < div className = "fixed bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 border-t bg-white p-4" >
                                <div className="flex gap-3" >
                                    <Button variant="outline" className = "h-12 flex-1 rounded-full" onClick = {() => onAddToCart(product, quantity, variation)}>
                                        Add to Cart
                                            < /Button>
                                            < Button className = "h-12 flex-1 rounded-full bg-orange-600 hover:bg-orange-700" onClick = {() => { onAddToCart(product, quantity, variation); onGoCart(); }}>
                                                Buy Now
                                                    < /Button>
                                                    < /div>
                                                    < /div>
                                                    < /div>
  );
}

function CartScreen({ cart, onBack, onCheckout, onUpdateQty, onRemove }) {
    const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

    return (
        <div className= "min-h-screen bg-slate-50 pb-28" >
        <Header title={ `Cart (${cart.length})` } onBack = { onBack } right = {< MapPin className = "h-5 w-5" />} />
            < div className = "mx-auto max-w-sm space-y-4 px-4 py-4" >
                {
                    cart.length === 0 ? (
                        <Card className= "rounded-3xl border-0 shadow-sm" >
                        <CardContent className="p-6 text-center">
                            <ShoppingCart className="mx-auto mb-3 h-10 w-10 text-slate-400" />
                                < p className="font-semibold" > Your cart is empty</ p >
                <p className="mt-1 text-sm text-slate-500" > Add some products first.< /p>
                    < /CardContent>
                    < /Card>
        ) : (
    cart.map((item) => (
        <Card key= { item.key } className = "rounded-3xl border-0 shadow-sm" >
        <CardContent className="p-4" >
    <div className="flex gap-3" >
    <img src={ item.image } alt = { item.name } className = "h-24 w-24 rounded-2xl object-cover" />
    <div className="flex-1" >
    <h3 className="line-clamp-2 font-semibold" > { item.name } < /h3>
    < p className = "mt-1 text-sm text-slate-500" > Variation: { item.variation } < /p>
    < p className = "mt-2 font-bold text-orange-600" > <Peso value={ item.price } /> </p>
    < div className = "mt-3 flex items-center justify-between" >
    <div className="flex items-center gap-2 rounded-full border px-2 py-1" >
    <button onClick={() => onUpdateQty(item.key, Math.max(1, item.quantity - 1))}> <Minus className="h-4 w-4" /> </button>
    < span className = "w-6 text-center text-sm font-medium" > { item.quantity } < /span>
    < button onClick = {() => onUpdateQty(item.key, item.quantity + 1)}> <Plus className="h-4 w-4" /> </button>
    < /div>
    < button onClick = {() => onRemove(item.key)} className = "text-sm text-red-500" > Remove < /button>
    < /div>
    < /div>
    < /div>
    < /CardContent>
    < /Card>
    ))
        )}

<Card className="rounded-3xl border-0 shadow-sm" >
    <CardContent className="p-4" >
        <h3 className="font-semibold" > Order protection < /h3>
            < div className = "mt-3 grid grid-cols-2 gap-3 text-sm text-slate-600" >
                <div className="rounded-2xl bg-slate-50 p-3" > Secure payments < /div>
                    < div className = "rounded-2xl bg-slate-50 p-3" > Guaranteed delivery < /div>
                        < div className = "rounded-2xl bg-slate-50 p-3" > Easy return </div>
                            < div className = "rounded-2xl bg-slate-50 p-3" > 24 / 7 support < /div>
                                < /div>
                                < /CardContent>
                                < /Card>
                                < /div>

                                < div className = "fixed bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 border-t bg-white p-4" >
                                    <div className="mb-3 flex items-center justify-between" >
                                        <span className="text-sm text-slate-500" > Subtotal < /span>
                                            < span className = "text-xl font-bold" > <Peso value={ subtotal } /></span >
                                                </div>
                                                < Button className = "h-12 w-full rounded-full bg-orange-600 hover:bg-orange-700" onClick = { onCheckout } disabled = { cart.length === 0 } >
                                                    Check out
                                                        < /Button>
                                                        < /div>
                                                        < /div>
  );
}

function CheckoutScreen({ cart, onBack, onSubmit }) {
    const [address, setAddress] = useState("Capitol Site, Bacolod City");
    const [payment, setPayment] = useState(PAYMENT_METHODS[0]);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 120 : 0;
    const discount = subtotal > 1000 ? 100 : 0;
    const total = subtotal + shipping - discount;

    return (
        <div className= "min-h-screen bg-slate-50 pb-28" >
        <Header title="Checkout" onBack = { onBack } right = {< CreditCard className = "h-5 w-5" />} />
            < div className = "mx-auto max-w-sm space-y-4 px-4 py-4" >
                <Card className="rounded-3xl border-0 shadow-sm" >
                    <CardContent className="p-4" >
                        <p className="mb-2 text-sm font-medium text-green-600" > Your information is secure < /p>
                            < label className = "text-sm font-medium" > Shipping address < /label>
                                < Input value = { address } onChange = {(e) => setAddress(e.target.value)} className = "mt-2 h-11 rounded-2xl" />
                                    </CardContent>
                                    < /Card>

                                    < Card className = "rounded-3xl border-0 shadow-sm" >
                                        <CardContent className="p-4" >
                                            <h3 className="font-semibold" > Items < /h3>
                                                < div className = "mt-3 space-y-3" >
                                                {
                                                    cart.map((item) => (
                                                        <div key= { item.key } className = "flex items-center gap-3 rounded-2xl bg-slate-50 p-3" >
                                                        <img src={ item.image } alt = { item.name } className = "h-16 w-16 rounded-xl object-cover" />
                                                        <div className="flex-1" >
                                                    <p className="line-clamp-2 text-sm font-medium" > { item.name } < /p>
                                                    < p className = "text-xs text-slate-500" > { item.variation } • Qty { item.quantity } < /p>
                                                    < /div>
                                                    < p className = "text-sm font-semibold" > <Peso value={ item.price * item.quantity } /> </p>
                                                    < /div>
                                                    ))
                                                }
                                                    < /div>
                                                    < /CardContent>
                                                    < /Card>

                                                    < Card className = "rounded-3xl border-0 shadow-sm" >
                                                        <CardContent className="p-4" >
                                                            <h3 className="font-semibold" > Payment method < /h3>
                                                                < div className = "mt-3 space-y-3" >
                                                                {
                                                                    PAYMENT_METHODS.map((method) => (
                                                                        <button
                  key= { method }
                  onClick = {() => setPayment(method)}
className = {`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${payment === method ? 'border-orange-600 bg-orange-50' : 'border-slate-200 bg-white'}`}
                >
    <span>{ method } < /span>
    < div className = {`h-4 w-4 rounded-full border ${payment === method ? 'border-orange-600 bg-orange-600' : 'border-slate-300'}`} />
        < /button>
              ))}
</div>
    < /CardContent>
    < /Card>

    < Card className = "rounded-3xl border-0 shadow-sm" >
        <CardContent className="p-4 space-y-2" >
            <div className="flex justify-between text-sm" > <span>Item subtotal < /span><span><Peso value={subtotal} / > </span></div >
                <div className="flex justify-between text-sm" > <span>Shipping fee < /span><span><Peso value={shipping} / > </span></div >
                    <div className="flex justify-between text-sm text-red-500" > <span>Discount < /span><span>-<Peso value={discount} / > </span></div >
                        <div className="mt-3 flex justify-between border-t pt-3 text-lg font-bold" > <span>Total < /span><span><Peso value={total} / > </span></div >
                            </CardContent>
                            < /Card>
                            < /div>

                            < div className = "fixed bottom-0 left-1/2 w-full max-w-sm -translate-x-1/2 border-t bg-white p-4" >
                                <div className="mb-3 flex items-center justify-between text-sm" >
                                    <span className="text-slate-500" > Pay with</span>
                                    < span className = "font-medium" > { payment } < /span>
                                        < /div>
                                        < Button className = "h-12 w-full rounded-full bg-orange-600 hover:bg-orange-700" onClick = {() => onSubmit({ address, payment, subtotal, shipping, discount, total })}>
                                            Submit order
                                                < /Button>
                                                < /div>
                                                < /div>
  );
}

function TrackingScreen({ order, onBack, onGoHome }) {
    const currentStep = 3;

    return (
        <div className= "min-h-screen bg-slate-50" >
        <Header title="Order Details" onBack = { onBack } right = {< User className = "h-5 w-5" />} />
            < div className = "mx-auto max-w-sm px-4 py-4" >
                <Card className="rounded-3xl border-0 shadow-sm" >
                    <CardContent className="p-5" >
                        <div className="mb-5 flex items-center justify-between" >
                            <div>
                            <p className="text-sm text-slate-500" > Order number < /p>
                                < p className = "font-semibold" > SG - { order.id } < /p>
                                    < /div>
                                    < div className = "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700" > Confirmed < /div>
                                        < /div>

                                        < div className = "mb-6 grid grid-cols-5 gap-2 text-center text-xs" >
                                        {
                                            TRACKING_STEPS.map((step, index) => {
                                                const active = index <= currentStep;
                                                return (
                                                    <div key= { step } className = "flex flex-col items-center" >
                                                        <div className={ `mb-2 h-3 w-3 rounded-full ${active ? 'bg-orange-500' : 'bg-slate-300'}` } />
                                                            < span className = { active? 'text-slate-900': 'text-slate-400' } > { step } < /span>
                                                                < /div>
                );
                                        })}
</div>

    < h3 className = "text-2xl font-bold" > Waiting for delivery < /h3>
        < p className = "mt-2 text-sm leading-6 text-slate-600" >
        Your order has been placed successfully.The payment has been received and the item is now being prepared for delivery.
            < /p>

            < div className = "mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm" >
            <div className= "flex items-center gap-3" > <CheckCircle2 className= "h-4 w-4 text-green-600" /> Order placed < /div>
                < div className = "flex items-center gap-3" > <CreditCard className="h-4 w-4 text-orange-600" /> Payment confirmed via { order.payment } </div>
                    < div className = "flex items-center gap-3" > <Package className="h-4 w-4 text-orange-600" /> Packed and ready for dispatch < /div>
                        < div className = "flex items-center gap-3" > <Truck className= "h-4 w-4 text-slate-400" /> Delivery in progress < /div>
                        < /div>

                        < div className = "mt-5 rounded-2xl border p-4" >
                            <p className="text-sm text-slate-500" > Shipping address < /p>
                                < p className = "mt-1 font-medium" > { order.address } < /p>
                                    < p className = "mt-3 text-sm text-slate-500" > Total paid < /p>
                                        < p className = "mt-1 text-xl font-bold" > <Peso value={ order.total } /></p >
                                            </div>

                                            < div className = "mt-5 space-y-3" >
                                                <Button className="h-12 w-full rounded-full bg-orange-600 hover:bg-orange-700" > Write review < /Button>
                                                    < Button variant = "outline" className = "h-12 w-full rounded-full" > Apply for refund < /Button>
                                                        < Button variant = "outline" className = "h-12 w-full rounded-full" onClick = { onGoHome } > Reorder < /Button>
                                                            < /div>
                                                            < /CardContent>
                                                            < /Card>
                                                            < /div>
                                                            < /div>
  );
}

export default function App() {
    const [screen, setScreen] = useState("login");
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState(null);

    function addToCart(product, quantity, variation) {
        const key = `${product.id}-${variation}`;
        setCart((prev) => {
            const existing = prev.find((item) => item.key === key);
            if (existing) {
                return prev.map((item) => item.key === key ? { ...item, quantity: item.quantity + quantity } : item);
            }
            return [
                ...prev,
                {
                    key,
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                    variation,
                },
            ];
        });
    }

    function updateQty(key, quantity) {
        setCart((prev) => prev.map((item) => item.key === key ? { ...item, quantity } : item));
    }

    function removeItem(key) {
        setCart((prev) => prev.filter((item) => item.key !== key));
    }

    function submitOrder(checkoutData) {
        const newOrder = {
            id: Math.floor(100000 + Math.random() * 900000),
            items: cart,
            ...checkoutData,
        };
        setOrder(newOrder);
        setCart([]);
        setScreen("tracking");
    }

    return (
        <div className= "min-h-screen bg-slate-200" >
        <div className="mx-auto min-h-screen max-w-sm bg-white shadow-2xl" >
            { screen === "login" && <LoginScreen onContinue={ () => setScreen("home") } />}
    {
        screen === "home" && (
            <HomeScreen
            products={ PRODUCTS }
        cartCount = { cart.length }
        onOpenCart = {() => setScreen("cart")
    }
    onOpenProduct = {(product) => {
        setSelectedProduct(product);
        setScreen("product");
    }
}
/>
        )}
{
    screen === "product" && (
        <ProductScreen
            product={ selectedProduct }
    onBack = {() => setScreen("home")
}
onGoCart = {() => setScreen("cart")}
onAddToCart = { addToCart }
    />
        )}
{
    screen === "cart" && (
        <CartScreen
            cart={ cart }
    onBack = {() => setScreen("home")
}
onCheckout = {() => setScreen("checkout")}
onUpdateQty = { updateQty }
onRemove = { removeItem }
    />
        )}
{
    screen === "checkout" && (
        <CheckoutScreen
            cart={ cart }
    onBack = {() => setScreen("cart")
}
onSubmit = { submitOrder }
    />
        )}
{
    screen === "tracking" && order && (
        <TrackingScreen
            order={ order }
    onBack = {() => setScreen("home")
}
onGoHome = {() => setScreen("home")}
/>
        )}
</div>
    < /div>
  );
}
