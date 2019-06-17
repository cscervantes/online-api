var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filterSchema = new Schema({
    main_section_url_filter:{
        skip_url_starts: Array,
        skip_url_ends: Array,
        skip_url_contains: Array,
        skip_exact_url: Array,
        accept_only: Array,
        regex_include_only: Array,
        regex_exclude_only: Array
    },
    sub_section_url_filter:{
        skip_url_starts: Array,
        skip_url_ends: Array,
        skip_url_contains: Array,
        skip_exact_url: Array,
        accept_only: Array,
        regex_include_only: Array,
        regex_exclude_only: Array
    },
    article_url_filter:{
        skip_url_starts: Array,
        skip_url_ends: Array,
        skip_url_contains: Array,
        skip_exact_url: Array,
        accept_only: Array,
        regex_include_only: Array,
        regex_exclude_only: Array
    },
    parser_default_selector:{
        title:Array,
        content: Array,
        date_publish: Array,
        author: Array,
        section: Array,
        image: Array,
        video: Array
    },
    timestamp:{
        created:{
            type: Date,
            default: new Date()
        },
        updated:{
            type: Date,
            default: new Date()
        }
    }  
});

filterSchema
    .index({ main_section_url_filter: 1 })
    .index({ sub_section_url_filter: 1 })
    .index({ article_url_filter: 1 })
    .index({ timestamp: -1 })

filterSchema.statics.storeFilter = function(data, cb){
    return this.create(data, cb);
}
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('filters', filterSchema)