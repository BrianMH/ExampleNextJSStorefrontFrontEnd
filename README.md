# Next.JS Storefront Example

An attempt at creating a storefront using an API completely new to me 
(I previously worked only with Flask). While it
could have also been created as an SPA using bare React, NextJS had a few aspects
I thought were a bit more intuitive to go through compared to bare React (namely a
proper implementation of a router as opposed to a logical one).

One thing I enjoyed about Next.JS is the ease of being able to create quite dynamic
routes using the app router. Being able to group things and then associate errors/layouts
to certain routes using groups and create parameter-based pages in a natural
directory structure similar to how a static page server works is convenient.

And being able to populate values from the server without passing API information
to the user seems like an incredible useful aspect for a secure website. That doesn't
mean there shouldn't be any security on the back-end, however...

Run the application using the typical command:
```bash
npm start
```

#### Note
Keep in mind that as is this program is quite heavily tied to the Java based back-end which can
be found [here](https://github.com/BrianMH/ExampleSpringStorefrontBackend)

## Potential Issues

* Performance issues associated with improper client-sided information delivery (in particular with products page)
* Odd UI choices in general (this was largely due to trying to commit to solely using TailwindCSS)
* Broken routes (This applies mostly to add routes like ```/dashboard/products/category/new```
but it also affects certain view routes such as ```/products/[productId]``)

## Reflection

All-in-all it was an enjoyable learning experience, but I think next time I will try and
rely on component libraries to build simple websites. While you definitely get a lot more
customization options when designing the page using raw HTML and TailwindCSS' classes, it
takes quite a significant amount of time to move from a sketch of the site to the implementation
(and that's not taking into account that dynamic changes to websites to allow for responsiveness
and user-oriented experiences increase the time to an MVP significantly).