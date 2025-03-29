const scopedModel = (model, venueId) => {
    const withVenue = (method, ...args) => {
      if (!venueId) return model[method](...args);
  
      if (['findAll', 'findOne', 'findAndCountAll'].includes(method)) {
        const options = args[0] || {};
        options.where = {
          ...options.where,
          venueId,
        };
        return model[method](options);
      }
  
      return model[method](...args);
    };
  
    return {
      findAll: (...args) => withVenue('findAll', ...args),
      findOne: (...args) => withVenue('findOne', ...args),
      findAndCountAll: (...args) => withVenue('findAndCountAll', ...args),
      // you can add more as needed
      model, // raw access if needed
    };
  };
  
  module.exports = scopedModel;
  