
const parseMultipartBody = require('../utils/parse-multipart');
const _ = require('lodash');
const findEntityAndCheckPermissions = async (ability, action, model, id) => {
    const contentManagerService = strapi.plugins['content-manager'].services.contentmanager;
    const entity = await contentManagerService.fetch(model, id);
  
    if (_.isNil(entity)) {
      throw strapi.errors.notFound();
    }
  
    const roles = _.has(entity, 'created_by.id')
      ? await strapi.query('role', 'admin').find({ users: entity.created_by.id }, [])
      : [];
    const entityWithRoles = _.set(_.cloneDeep(entity), 'created_by.roles', roles);
  
    const pm = strapi.admin.services.permission.createPermissionsManager(ability, action, model);
  
    if (pm.ability.cannot(pm.action, pm.toSubject(entityWithRoles))) {
      throw strapi.errors.forbidden();
    }
  
    return { pm, entity };
  };
  const ACTIONS = {
    read: 'plugins::content-manager.explorer.read',
    create: 'plugins::content-manager.explorer.create',
    edit: 'plugins::content-manager.explorer.update',
    delete: 'plugins::content-manager.explorer.delete',
  };
module.exports={
    async update(ctx) {
        const {
          state: { userAbility, user },
          params: { id, model },
          request: { body },
        } = ctx;
         console.log('strapi');
        const contentManagerService = strapi.plugins['content-manager'].services.contentmanager;
    
        const { pm, entity } = await findEntityAndCheckPermissions(
          userAbility,
          ACTIONS.edit,
          model,
          id
        );
    
        const sanitize = e => pm.pickPermittedFieldsOf(e, { subject: pm.toSubject(entity) });
    
        const { data, files } = ctx.is('multipart') ? parseMultipartBody(ctx) : { data: body };
    
        try {
          const result = await contentManagerService.edit(
            { id },
            { data: { ...sanitize(_.omit(data, ['created_by'])), updated_by: user.id }, files },
            { model }
          );
          console.log(data);
         
    
          
          const author=await strapi.query["user","users-permissions"].find({id:data.author});
          console.log(author);
          ctx.body = pm.sanitize(result, { action: ACTIONS.read });
        } catch (error) {
          strapi.log.error(error);
          ctx.badRequest(null, [
            {
              messages: [{ id: error.message, message: error.message, field: error.field }],
              errors: _.get(error, 'data.errors'),
            },
          ]);
        }
      }

}