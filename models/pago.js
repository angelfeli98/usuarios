'use stric'

var pago = require('mongoose'),
Schema = pago.Schema;

var PagoSchema = new Schema (
    {
        numero_tarjeta: {
            type: Number,
            trim: true,
            default: 0000000000000000,
            required: [true,'Inserte un numero de tarjeta'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        mesvencimiento: {
            type: Number,
            default: 00,
            required: [true,'Insrete el mes de vencimeinto'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        anovencimiento: {
            type: Number,
            default: 0000,
            required: [true,'Inserte ano de nacimiento'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        cvv: {
            type: Number,
            default: 000,
            required: [true,'Insrete un codigo de seguridad'],
            index: {
                unique: false,
                dropDups: true
            }
        }
    },
    {
        timestamps: true
    }
);

var Pago = pago.model('Pago', PagoSchema);
module.exports = Pago;
