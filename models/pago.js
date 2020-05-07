'use stric'

var pago = require('mongoose'),
Schema = pago.Schema;
var usuario = require('./usuario');

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
            type: String,
            default: '',
            required: [true,'Insrete un codigo de seguridad'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'usuario',
            default: null,
            required: [true, 'Inserte el propetario']
        }
    },
    {
        timestamps: true
    }
);

var Pago = pago.model('Pago', PagoSchema);
module.exports = Pago;
