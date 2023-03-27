import User, { hasMany } from './User';
import BlogPost, { belongsTo, hasMany as _hasMany } from './BlogPost';
import Comment, { belongsTo as _belongsTo } from './Comment';

hasMany(BlogPost, { foreignKey: 'user_id' });
belongsTo(User, { foreignKey: 'user_id' });

hasMany(Comment, { foreignKey: 'user_id' });
_belongsTo(User, { foreignKey: 'user_id' });

_hasMany(Comment, { foreignKey: 'post_id' });
_belongsTo(BlogPost, { foreignKey: 'post_id' });

export default { User, BlogPost, Comment };
