'use strict'


module.exports = ({ mongoose }) => {

    let _schema = new mongoose.Schema({
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'buyer'
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            default: 'money',
            enum: [
                'money',
                'credit',
                'debit',
                'others'
            ]
        },
        card: {
            brand: {
                type: String,
                required: true
            },
            owner: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            expiration: {
                type: String,
                required: true
            },
            bin: {
                type: String,
                required: true
            }
        },
        date: {
            type: Number,
            default: 0
        }
    })

    return {
        entity: _schema,
        model: mongoose.model('payment', _schema)
    }
}

