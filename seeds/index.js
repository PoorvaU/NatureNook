const mongoose = require('mongoose');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
})

const sample = array=> array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({})
    // const c = new Campground({title:'purple field'});
    // await c.save();

    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 37);
        const price = Math.floor(Math.random() * 30) + 1;
        const camp = new Campground({
            author:'66923e90d278cdc168297c66',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].lng,
                  cities[random1000].lat,
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dixc7mfmz/image/upload/v1721968506/YelpCamp/nmsvnnpkg5tprxkvovib.jpg',
                  filename: 'YelpCamp/nmsvnnpkg5tprxkvovib',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dixc7mfmz/image/upload/v1721927799/YelpCamp/n8gowxm5rjjyetbgk1rn.jpg',
                  filename: 'YelpCamp/n8gowxm5rjjyetbgk1rn',
                  
                }
                
              ]
        })
        await camp.save();
}
}

seedDB().then(() => {
    mongoose.connection.close();
})