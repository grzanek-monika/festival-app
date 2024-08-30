const Testimonial = require('./../models/testimonials.model');

exports.getRandom = async (req, res) => {
    try {
      const count = await Testimonial.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Testimonial.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    } 
}

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    }
    catch(err) {
      res.status(500).json({message: err});
    } 
}

exports.getSingle = async (req, res) => {
    try {
      const test = await Testimonial.findById(req.params.id);
      if(!test) {
        res.status(404).json({message: "Not found..."});
      } else {
        res.json(test);
      }
    }
    catch(err) {
      res.status(500).json({message: err});
    }
}

exports.addNew = async (req, res) => {
    const { author, text } = req.body;
    try {
      if(author && text) {
        const newTestimonial = new Testimonial({author: author, text: text});
        newTestimonial.save();
        res.json({message: "OK"});
      } else {
        res.status(404).json({message: "You can\'t leave any fields empty!"})
      }
    }
    catch(err) {
      res.status(500).json({message: err});
    }
}

exports.updateItem = async (req, res) => {
    const { author, text } = req.body;
    try {
      if(author && text) {
        await Testimonial.updateOne({_id: req.params.id}, {$set: {author: author, text: text}});
        res.json({message: "OK"});
      } else {
        res.status(404).json({message: "You can\'t leave any fields empty!"});
      }
    }
    catch(err) {
      res.status(500).json({message: err});
    }
}

exports.deleteItem = async (req, res) => {
    try {
      const test = await Testimonial.findById(req.params.id);
      if(!test) {
        res.status(404).json({message: "Not Found..."});
      } else {
        await Testimonial.deleteOne({_id: req.params.id});
        res.json({message: "OK"});
      }
    }
    catch(err) {
      res.status(500).json({message: err})
    }
}