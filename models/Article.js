var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var articleSchema = new Schema({
    article_src_url:{
        type: String,
        default: null
    },
    article_src_aut_full_name:{
        type:String,
        default:null,
        trim: true,
    },
    article_src_aut_first_name:{
        type:String,
        default:null,
        trim: true,
    },
    article_src_aut_last_name:{
        type:String,
        default:null,
        trim: true,
    },
    article_src_med_type: {
        type:String,
        default:null
    },
    article_img_vid_url: {
        imgs: {
            type: Array,
            default: []
        },
        vids: {
            type: Array,
            default: []
        }
    },
    article_full_url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    article_content: {
        type: String,
        trim: true,
    },
    article_summary: {
        type: String,
        default: null,
        trim: true,
    },
    article_title: {
        type: String,
        default: null,
        trim: true
    },
    article_date_created_sys_time: {
        type: Date,
        default: Date.now()
    },
    article_date: {
        type: Date,
        get: function(v){
            return v.split('T')[0]
        },
        set: function(v){
            return v.split('T')[0]
        },
        default: Date.now()
    },
    article_datetime: {
        type:Date,
        default: Date.now()
    },
    article_last_modified: {
        type: Date,
        default: null
    },
    article_last_modified_unix_tstamp: {
        type: Number,
        default: null
    },
    article_section: {
        type: String,
        default: null
    },
    article_keywords: {
        type: String,
        default: null
    },
    article_pr_value:{
        type: Number,
        get: function(v){
            return parseFloat(v).toFixed(2)
        },
        set: function(v){
            return parseFloat(v).toFixed(2)
        },
        default: "0.00"
    },
    article_ad_value:{
        type: Number,
        get: function(v){
            return parseFloat(v).toFixed(2)
        },
        set: function(v){
            return parseFloat(v).toFixed(2)
        },
        default: "0.00"
    },
    publication_id: [{
        type: ObjectId,
        ref: 'websites'
    }],
    country_id: [{
        type: ObjectId,
        ref: 'countries'
    }],
    author_id: [{
        type: ObjectId,
        ref: 'authors'
    }],
    media_type_id: [{
        type: ObjectId,
        ref: 'media_types'
    }],
    section_id: [{
        type: ObjectId,
        ref: 'sections'
    }],
    account_id: [{
        type: ObjectId,
        ref: 'accounts'
    }],
    article_status: {
        type: String,
        enum: ['QUEUED', 'ERROR', 'INVALID', 'DONE'],
        default: 'QUEUED'
    }
});

articleSchema
    .index({ article_src_aut_full_name: 1 })
    .index({ article_full_url: 1 })
    .index({ article_src_url: 1 })
    .index({ article_last_modified: -1 })
    .index({ article_last_modified_unix_tstamp: 1 })
    .index({ article_section: 1 })
    .index({ article_date_created_sys_time: -1})
    .index({ article_src_med_type: 1})

articleSchema.statics.storeArticle= function(data, cb){
    return this.create(data, cb);
}
articleSchema.statics.storeBulkArticles = function(data, cb){
    return this.insertMany(data, cb)
}
mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('articles', articleSchema)