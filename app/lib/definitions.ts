// Contains some of the models that we will need for the DTO abstractions uses

// Defines the Message type
export type Message = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created: string;
};

// defines a message type that holds only skeletal information from a message
export type ShortenedMessage = {
    id: number;
    name: string;
    email: string;
    subject: string;
    shortMessage: string;
}

// defines the User type and all associated values
export type User = {
    id: string;
    email: string;
    username: string;
    screenName: string;
    password: string; // this is bcrypt encrypted!
    avatarRef: string; // and this holds an accessible image file URL
    role: string;   // holds authorization roles
}

// Defines a cart item in as barebones a way as possible
export type CartItem = {
    productId: string;
    quantity: number;
}

// and of course our cart is simply a collection of cart item
export type Cart = CartItem[]

export const Roles = {
    ROLE_ANON: "ROLE_ANON",
    ROLE_USER: "ROLE_USER",
    ROLE_ADMIN: "ROLE_ADMIN",
}

// defines our address type
export type Address = {
    addressId: string;
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    stateCode: string;
    zipCode: string;
    extraInfo: string;

    queryUser: string; // this holds the owning user's ID
}

// defines the product category type
export type ProductCategory = {
    id: string;
    name: string;
    description: string;
    imageRef: string;

    relProducts?: Product[];
}

// defines what can be seen from inside our product tuple
export type Product = {
    productId: string;
    name: string;
    description: string;
    outOfStock: boolean;
    carouselList: string[];
    priceInCents: number;

    category: ProductCategory;
}

// defines our Notification data type
export type Notification = {
    id: string;
    ownedBy: User;
    notifyFor: ProductCategory;
    enabled: boolean;
}