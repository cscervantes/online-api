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
  scraper_setting: {
      type: String,
      enum: ['REGEX_CONFIG', 'SECTION_CONFIG', 'BOTH_CONFIG'],
      default: 'FROM_REGEX'
  },
  regex_config:{ // used for scraper setting
      type: Object,
      default: null
  },
  section_config: { // used for scraper setting
      type: Object,
      default: null
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
      type: Array,
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
  date_created: {
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

websiteSchema.statics.storeWebsite = function(data, cb){
    return this.create(data, cb);
}

module.exports = mongoose.model('websites', websiteSchema)