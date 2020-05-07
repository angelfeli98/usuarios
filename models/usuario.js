'use stric'

var usuario = require('mongoose'),


Schema = usuario.Schema;
var pago = require('./pago');

var UsuarioSchema = new Schema (
    {
        nombre_usuario: {
            type: String,
            trim: true,
            default: '',
            required: [true,'Insrete nombre de usuario'],
            index: {
                unique: true,
                dropDups: true
            }
        },
        password: {
            type: String,
            default: '',
            required: [true,'Insrete una contrasenia'],
            index: {
                unique: true,
                dropDups: true
            }
        },
        info_pago: {
            type: Schema.Types.ObjectId,
            ref: 'pago',
            default: null,
            required: false
        },
        playlists:[{
            type: Schema.Types.ObjectId,
            default: null,
            required: false
        }],
        fecha_nacimiento: {
            type: Date,
            default: Date.now,
            required: [true,'Inserte fecha de nacimiento'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        email: {
            type: String,
            default: '',
            required: [true,'Insrete un correo'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        rol_usuario: {
            type: Boolean,
            default: true,
            required: [true,'Insrete un rol_usuario'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        rol_artista: {
            type: Boolean,
            default: true,
            required: [true,'Insrete un rol_artista'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        rol_admin: {
            type: Boolean,
            default: true,
            required: [true,'Insrete un rol_admin'],
            index: {
                unique: false,
                dropDups: true
            }
        },
        foto: {
            type: Buffer,
            default: '',
            required: false,
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

var Usuario = usuario.model('Usuario', UsuarioSchema);
module.exports = Usuario;
