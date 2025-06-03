const Category = require('../models/category');
const Event = require('../models/event');

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const categoryCounts = await Event.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        const categoriesWithCounts = categories.map(category => {
            const count = categoryCounts.find(c => c._id === category.name)?.count || 0;
            return {
                _id: category._id,
                name: category.name,
                count: count,
                color: category.color,
                icon: category.icon
            };
        });

        res.status(200).json({
            message: 'Categories fetched successfully',
            categories: categoriesWithCounts
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            message: 'Error fetching categories',
            error: error.message
        });
    }
};

exports.getEventsByCategory = (req, res, next) => {
    Event.find({ category: req.params.category })
        .then(events => {
            if (events) {
                res.status(200).json({
                    message: "Events by categories fetching is success",
                    events: events
                });
            } else {
                res.status(404).json({ message: 'No events found for this user!' });
            }
            
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching events failed!"
            });
        });
    

}


