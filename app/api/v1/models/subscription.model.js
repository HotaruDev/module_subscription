import mongoose  from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subscription name is required'],
        trim: true,
        minLength: 3,
        maxLength: 50
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'price must be greater than 0']
    },
    currency: {
        type: String,
        enum: ['IDR', 'USD', 'EUR'],
        default: 'IDR'
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['basic', 'premium', 'enterprise'],
        required: true
    },
    payment_method: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        dafault: 'active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: value => value <= new Date(),
            message: 'start date must be in the past'
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(value){return value > this.startDate},
            message: 'renewal date must be after start date'
        }
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }
}, {timestamps: true});

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const renewalPriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPriods[this.frequency]);
    }

    if(this.renewalDate < new Date()) {
        this.status = 'expired'
    }

    next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;