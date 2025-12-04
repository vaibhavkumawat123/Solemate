import { useState } from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ShoppingBag,
  Bell,
  Lock,
  CreditCard,
  Globe,
  Phone,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, updateUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    newArrivals: true,
  });

  const orders = [
    {
      id: "ORD-2024-001",
      date: "Nov 5, 2025",
      status: "Delivered",
      total: "$189.99",
      items: [
        {
          name: "Air Max Pro Runner",
          size: "US 8",
          color: "White/Blue",
          quantity: 1,
          price: "$129.99",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        },
        {
          name: "Classic Sneaker",
          size: "US 8",
          color: "Black",
          quantity: 1,
          price: "$60.00",
          image:
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
        },
      ],
    },
    {
      id: "ORD-2024-002",
      date: "Oct 28, 2025",
      status: "In Transit",
      total: "$149.99",
      items: [
        {
          name: "Running Sport Shoes",
          size: "US 8",
          color: "Red/White",
          quantity: 1,
          price: "$149.99",
          image:
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80",
        },
      ],
    },
  ];

  const addresses = [
    {
      id: 1,
      label: "Home",
      name: "Sarah Johnson",
      street: "123 Main Street",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      name: "Sarah Johnson",
      street: "456 Business Ave",
      city: "New York, NY 10002",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ];

  const wishlist = useSelector((state) => state.wishlist.items).map((item) => ({
    ...item,
    _id: item._id || item.id,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-100";
      case "In Transit":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Processing":
        return "bg-yellow-50 text-yellow-700 border-yellow-100";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100";
    }
  };

  const handleProfileUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);

      if (data.phone) formData.append("phone", data.phone);
      if (data.bio) formData.append("bio", data.bio);

      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await dispatch(
        saveProfile({ formData, userId: user._id })
      );

      if (response.payload?.user) {
        dispatch(updateUser(response.payload.user));
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while updating your profile!",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match");
    }

    const res = await dispatch(
      changePassword({
        userId: user._id,
        oldPassword,
        newPassword,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(res.payload);
    }
  };

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-19">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Profile Picture */}
            <Avatar className="w-24 h-24 border-2 border-gray-200 shadow-sm">
              <AvatarImage
                src={user.avatar ? `${BASE_URL}${user.avatar}` : undefined}
                alt={user.name}
              />
              <AvatarFallback className="text-2xl bg-gray-100 text-gray-700 font-semibold">
                {user.name
                  ?.split(" ")
                  ?.map((n) => n[0])
                  ?.join("")
                  ?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div className="flex-1 w-full">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {user.name}
              </h1>

              <p className="text-gray-500 text-l font-medium mt-0.5">
                {user.email}
              </p>
              {user.phone && (
                <p className="text-zinc-600 font-medium flex items-center gap-1 mt-1">
                  <Phone size={16} className="text-gray-700" />
                  {user.phone}
                </p>
              )}

              {user.bio && (
                <p className="mt-3 text-gray-700">
                  <span className="font-semibold text-gray-800">Bio: </span>
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-gray-700" />
                  <span className="font-medium">{orders.length} Orders</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-gray-700" />
                  <span className="font-medium">
                    {wishlist.length} Wishlist Items
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-700" />
                  <span className="font-medium">
                    {addresses.length} Addresses
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              className="!bg-black text-white !font-semibold px-4 py-2 rounded-md hover:brightness-110 transition"
              onClick={() => navigate("/update-profile")}
            >
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className=" w-full flex items-center justify-start gap-2 sm:gap-4 overflow-x-auto sm:overflow-visible scrollbar-hide border-b-2 border-gray-300 rounded-none bg-transparent mb-3 sm:mb-6 p-2 sm:p-0 pt-3 pb-2 sm:pt-0 sm:pb-0 mt-4 sm:mt-0 snap-x snap-mandatory h-23 ">
            {" "}
            {[
              { value: "orders", icon: Package, label: "Orders" },
              { value: "addresses", icon: MapPin, label: "Addresses" },
              { value: "wishlist", icon: Heart, label: "Wishlist" },
              { value: "settings", icon: Settings, label: "Settings" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className=" relative border-b-2 border-transparent rounded-none transition-all duration-300 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[11px] xs:text-xs sm:text-base font-medium whitespace-nowrap text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-0 data-[state=active]:before:absolute data-[state=active]:before:bottom-0 data-[state=active]:before:left-0 data-[state=active]:before:w-full data-[state=active]:before:h-[3px] data-[state=active]:before:bg-gradient-to-r data-[state=active]:before:from-yellow-400 data-[state=active]:before:via-amber-500 data-[state=active]:before:to-orange-400 data-[state=active]:before:animate-gradient-x px-2.5 py-2 sm:px-4 sm:py-2 min-w-[80px] xs:min-w-[90px] sm:min-w-[110px] snap-center flex-shrink-0 "
              >
                {" "}
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />{" "}
                <span>{label}</span>{" "}
              </TabsTrigger>
            ))}{" "}
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card
                key={order.id}
                className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {order.id}
                      </h3>
                      <Badge
                        className={getStatusColor(order.status)}
                        variant="outline"
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-xl font-bold text-gray-900">
                        {order.total}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} • Color: {item.color} • Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4 animate-fade-in">
            {" "}
            <div className="grid md:grid-cols-2 gap-4">
              {" "}
              {addresses.map((address) => (
                <Card
                  key={address.id}
                  className="p-6 bg-gradient-card border-gray-300 hover:shadow-medium transition-all relative"
                >
                  {" "}
                  {address.isDefault && (
                    <Badge className="absolute top-4 right-4 bg-yellow-100 border-yellow-600 text-primary ">
                      {" "}
                      Default{" "}
                    </Badge>
                  )}{" "}
                  <div className="space-y-3">
                    {" "}
                    <div>
                      {" "}
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {" "}
                        {address.label}{" "}
                      </h3>{" "}
                      <p className="text-foreground">{address.name}</p>{" "}
                    </div>{" "}
                    <div className="text-sm text-muted-foreground space-y-1">
                      {" "}
                      <p>{address.street}</p> <p>{address.city}</p>{" "}
                      <p>{address.phone}</p>{" "}
                    </div>{" "}
                    <div className="flex gap-2 pt-3">
                      {" "}
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 !bg-gray-50"
                      >
                        {" "}
                        Edit{" "}
                      </Button>{" "}
                      {!address.isDefault && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100"
                        >
                          {" "}
                          Set as Default{" "}
                        </Button>
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                </Card>
              ))}{" "}
              <Card className="p-6 bg-gradient-card border-border/50 border-dashed hover:shadow-medium transition-all flex items-center justify-center cursor-pointer group">
                {" "}
                <div className="text-center">
                  {" "}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gradient-primary transition-all">
                    {" "}
                    <MapPin className="w-12 h-12 bg-amber-200 p-2.5 text-yellow-700 group-hover:text-primary-foreground rounded-full" />{" "}
                  </div>{" "}
                  <p className="font-medium text-foreground">Add New Address</p>{" "}
                </div>{" "}
              </Card>{" "}
            </div>{" "}
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="space-y-4">
              {wishlist.length === 0 ? (
                <p className="text-center text-gray-500 py-10 text-lg">
                  Your wishlist is empty ❤️
                </p>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="
            flex flex-col sm:flex-row sm:items-center 
            gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 
            hover:shadow-md transition
          "
                  >
                    {/* Image */}
                    <div className="w-full sm:w-24 h-40 sm:h-24 mx-auto sm:mx-0 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image || item.imageURL || item.mainImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">{item.brand}</p>
                      <p className="text-2xl sm:text-xl font-extrabold bg-gradient-to-r from-red-400 via-red-600 to-red-700 bg-clip-text text-transparent">
                        ₹{item.price}
                      </p>

                      {!item.inStock && (
                        <span className="text-sm text-gray-500 font-medium block mt-1">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                      <Button
                        onClick={() => navigate(`/product/${item._id}`)}
                        className="
    flex-1 !bg-black text-white py-2 rounded-xl 
    !hover:bg-neutral-800 transition !font-medium
  "
                        // disabled={!item.inStock}
                      >
                        View Product
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => {
                          dispatch(toggleWishlist(item));

                          toast({
                            title: "Removed from Wishlist 💔",
                            description: `${item.name} has been removed from your wishlist.`,
                            className:
                              "bg-black/85 text-white border border-gray-400 shadow-xl",
                          });
                        }}
                        className="border-red-500 flex items-center gap-2"
                      >
                        Remove
                        <Heart className="w-5 h-5 text-red-500" fill="red" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in space-y-6">
            {/* Notifications */}
            <Card className="p-6 bg-gradient-card border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="w-12 h-12 p-2.5 rounded-full text-amber-700 !bg-amber-200" />
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Notifications
                  </h3>
                  <p className="text-sm font-normal text-muted-foreground text-gray-600">
                    Manage your notification preferences
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Order Updates */}
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">Order Updates</p>
                    <p className="text-sm text-gray-600">
                      Get notified about your order status
                    </p>
                  </div>

                  <div
                    onClick={() => handleNotificationToggle("orderUpdates")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      notifications.orderUpdates
                        ? "bg-yellow-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                        notifications.orderUpdates
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Promotions */}
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">
                      Promotions & Deals
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive exclusive offers and discounts
                    </p>
                  </div>

                  <div
                    onClick={() => handleNotificationToggle("promotions")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      notifications.promotions ? "bg-yellow-500" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                        notifications.promotions
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                {/* Newsletter */}
                <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">Newsletter</p>
                    <p className="text-sm text-gray-600">
                      Stay updated with our latest news
                    </p>
                  </div>

                  <div
                    onClick={() => handleNotificationToggle("newsletter")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      notifications.newsletter ? "bg-yellow-500" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                        notifications.newsletter
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>

                {/* New Arrivals */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-foreground">New Arrivals</p>
                    <p className="text-sm text-gray-600">
                      Be the first to know about new products
                    </p>
                  </div>

                  <div
                    onClick={() => handleNotificationToggle("newArrivals")}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      notifications.newArrivals
                        ? "bg-yellow-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                        notifications.newArrivals
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* LogOut */}
            <Card className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
              <Button
                variant="outline"
                onClick={() => setLogoutDialog(true)}
                className="
    w-full py-3 font-semibold text-red-600 
    border-red-500 bg-white rounded-xl
    hover:bg-red-600 hover:text-white
    hover:shadow-lg hover:shadow-red-300/50
    flex items-center justify-center gap-2
    transition-all duration-300
  "
              >
                <LogOut size={18} />
                Logout
              </Button>

              {/* ==== LOGOUT CONFIRMATION DIALOG ==== */}
              {logoutDialog && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center">
                  <div className="bg-white rounded-xl shadow-xl p-6 w-80 animate-fadeIn">
                    {!isLoggingOut ? (
                      <>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                          Are you sure?
                        </h2>
                        <p className="text-gray-600 text-center mb-6">
                          Do you really want to logout?
                        </p>

                        <div className="flex gap-3">
                          <Button
                            className="flex-1 !bg-gray-200 !text-gray-700 !hover:bg-gray-300"
                            onClick={() => setLogoutDialog(false)}
                          >
                            Cancel
                          </Button>

                          <Button
                            className="flex-1 bg-red-600 text-white hover:bg-red-700"
                            onClick={() => {
                              setIsLoggingOut(true);
                              setTimeout(() => {
                                dispatch(logout());

                                toast({
                                  title: "Logged out",
                                  description:
                                    "You have been logged out successfully.",
                                  className:
                                    "bg-black/85 text-white border border-gray-400 shadow-xl",
                                });

                                setLogoutDialog(false);
                                setIsLoggingOut(false);
                                window.location.href = "/";
                              }, 2500);
                            }}
                          >
                            Logout
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        {/* Loader */}
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin mb-4" />

                        <p className="text-gray-700 font-semibold">
                          Processing logout...
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Security */}
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="w-12 h-12 p-2.5 rounded-full text-amber-700 !bg-amber-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Security
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage your account security
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 mb-6">
                <Button
                  variant="outline"
                  className="w-full hover:!bg-amber-100 justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" /> Two-Factor Authentication
                </Button>
                <Button
                  variant="outline"
                  className="w-full hover:!bg-amber-100 justify-start"
                >
                  <User className="w-4 h-4 mr-2" /> Active Sessions
                </Button>
              </div>

              {/* CHANGE PASSWORD UI */}
              <div className="space-y-4 mt-4 border-t border-gray-300 pt-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Change Your Password
                </h4>

                <div>
                  <Label className="font-medium">Old Password</Label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter old password"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="font-medium">New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="font-medium">Confirm New Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-1"
                  />
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-black font-semibold hover:brightness-110 transition-all"
                  onClick={handlePasswordChange}
                >
                  Update Password
                </Button>
              </div>
            </Card>

            {/* Payment Methods */}
            <Card className="p-6 bg-gradient-card border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CreditCard className="w-12 h-12 p-2.5 rounded-full text-amber-700 !bg-amber-200" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Payment Methods
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your saved payment options
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">
                        Visa ending in 4242
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/25
                      </p>
                    </div>
                  </div>

                  <Badge className="text-amber-700 bg-amber-100 border-amber-950">
                    Default
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full hover:!bg-amber-100"
                >
                  Add Payment Method
                </Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 bg-gradient-card border-red-400 !bg-red-50">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-xl font-semibold text-red-500">
                  Danger Zone
                </h3>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full text-destructive border-red-400 !bg-red-100 hover:!bg-red-200"
                >
                  Delete Account
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
