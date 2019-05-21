var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var websiteSchema = new Schema({
    website_name: {
        required: true,
        uppercase: true,
        type: String,
        trim: true,
        unique: true,
    },
    website_url: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    fqdn:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
    },
    main_section_config: { // used for scraper setting
        startsWith: {
            type: Array,
            default: []
        },
        endsWith: {
            type: Array,
            default: []
        },
        containsWith: {
            type: Array,
            default: []
        },
        exact: {
            type: Array,
            default: []
        },
        accept_only: {
            type: Array,
            default: []
        },
        regex_include: {
            type: Array,
            default: []
        },
        regex_exclude: {
            type: Array,
            default: []
        }
    },
    sub_section_config: { // used for scraper setting
        startsWith: {
            type: Array,
            default: []
        },
        endsWith: {
            type: Array,
            default: []
        },
        containsWith: {
            type: Array,
            default: []
        },
        exact: {
            type: Array,
            default: []
        },
        accept_only: {
            type: Array,
            default: []
        },
        regex_include: {
            type: Array,
            default: []
        },
        regex_exclude: {
            type: Array,
            default: []
        }
    },
    main_sections: {
        type: Array,
        default: null
    },
    sub_sections: { // this field can be used for manual checking
        type: Array,
        default: null
    },
    category: {
        type: String,
        enum: ['News', 'Blog'],
        default: 'News'
    },
    alexa_rankings: {
        type: Object,
        default: null
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'EXPIRED'],
        default: 'INACTIVE'
    },
    region: {
        type: String,
        default: null
    },
    country: {
        type: String,
        trim: true,
        default: null
    },
    visit_history: {
        type: Array,
        default: null
    },
    needs_endslash:{
        type:Boolean,
        default: false
    },
    has_subsection:{
        type:Boolean,
        default: false
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    }
});
websiteSchema
    .index({ website_name: 1 })
    .index({ website_url: 1 })
    .index({ fqdn: 1 })
    .index({ region: 1 })
    .index({ country: 1 })
    .index({ status: 1 })
    .index({ date_created: -1})
    .index({ date_updated: -1})

websiteSchema.statics.storeWebsite = function(data, cb){
    return this.create(data, cb);
}

module.exports = mongoose.model('websites', websiteSchema)