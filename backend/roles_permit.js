// User roles
export const roles = {
  user: 'user',
  admin: 'admin',
  superAdmin: 'superAdmin',
  editor: 'editor',
  moderator: 'moderator',
  author: 'author',
  subscriber: 'subscriber',
  // premium: 'premium',
};

// User permissions
export const permissions = {
  read: 'read',
  write: 'write',
  update: 'update',
  delete: 'delete',
  publish: 'publish',
  unpublish: 'unpublish',
  approve: 'approve',
  suspend: 'suspend',
  block: 'block',
  unblock: 'unblock',
  verify: 'verify',
  subscribe: 'subscribe',
  unsubscribe: 'unsubscribe',
  deleteAccount: 'deleteAccount',
  create: 'create',
  edit: 'edit',
  manage: 'manage',
  view: 'view',
  viewAll: 'viewAll',
  viewOwn: 'viewOwn',
  viewPublished: 'viewPublished',
  viewUnpublished: 'viewUnpublished',
  viewDeleted: 'viewDeleted',
  viewActive: 'viewActive',
  viewInactive: 'viewInactive',
  viewPending: 'viewPending',
  viewApproved: 'viewApproved',
  viewSuspended: 'viewSuspended',
  viewBlocked: 'viewBlocked',
  viewVerified: 'viewVerified',
  viewUnverified: 'viewUnverified',
  viewSubscribed: 'viewSubscribed',
  viewUnsubscribed: 'viewUnsubscribed',
  viewPremium: 'viewPremium',
  viewUnpremium: 'viewUnpremium',
  viewBlocked: 'viewBlocked',
  viewUnblocked: 'viewUnblocked',
  viewDeleted: 'viewDeleted',
  viewOwnProfile: 'viewOwnProfile',
  viewOthersProfile: 'viewOthersProfile',
  viewOwnPosts: 'viewOwnPosts',
  viewOthersPosts: 'viewOthersPosts',
  viewOwnComments: 'viewOwnComments',
  viewOthersComments: 'viewOthersComments',
  viewOwnLikes: 'viewOwnLikes',
  viewOthersLikes: 'viewOthersLikes',
  viewOwnDislikes: 'viewOwnDislikes',
  viewOthersDislikes: 'viewOthersDislikes',
  viewOwnConnections: 'viewOwnConnections',
  viewOthersConnections: 'viewOthersConnections',
  viewOwnFollowers: 'viewOwnFollowers',
  viewOthersFollowers: 'viewOthersFollowers',
  viewOwnFollowing: 'viewOwnFollowing',
  viewOthersFollowing: 'viewOthersFollowing',
  viewOwnMessages: 'viewOwnMessages',
  viewOthersMessages: 'viewOthersMessages',
  viewOwnNotifications: 'viewOwnNotifications',
  viewOthersNotifications: 'viewOthersNotifications',
  viewOwnActivities: 'viewOwnActivities',
  viewOthersActivities: 'viewOthersActivities',
  viewOwnSettings: 'viewOwnSettings',
  viewOthersSettings: 'viewOthersSettings',
  viewOwnAccount: 'viewOwnAccount',
  viewOthersAccount: 'viewOthersAccount',
  viewOwnProfile: 'viewOwnProfile',
  viewOthersProfile: 'viewOthersProfile',
  viewOwnPosts: 'viewOwnPosts',
  viewOthersPosts: 'viewOthersPosts',
  viewOwnComments: 'viewOwnComments',
  viewOthersComments: 'viewOthersComments',

  // User permissions
  user: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Admin permissions
  admin: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Super admin permissions
  superAdmin: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Moderator permissions
  moderator: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Editor permissions
  editor: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Author permissions
  author: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },

  // Subscriber permissions
  subscriber: {
    read: ['read', 'view', 'viewAll', 'viewOwn', 'viewPublished', 'viewUnpublished', 'viewDeleted', 'viewActive', 'viewInactive', 'viewPending', 'viewApproved', 'viewSuspended', 'viewBlocked', 'viewVerified', 'viewUnverified', 'viewSubscribed', 'viewUnsubscribed', 'viewPremium', 'viewUnpremium', 'viewBlocked', 'viewUnblocked', 'viewDeleted', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments', 'viewOwnLikes', 'viewOthersLikes', 'viewOwnDislikes', 'viewOthersDislikes', 'viewOwnConnections', 'viewOthersConnections', 'viewOwnFollowers', 'viewOthersFollowers', 'viewOwnFollowing', 'viewOthersFollowing', 'viewOwnMessages', 'viewOthersMessages', 'viewOwnNotifications', 'viewOthersNotifications', 'viewOwnActivities', 'viewOthersActivities', 'viewOwnSettings', 'viewOthersSettings', 'viewOwnAccount', 'viewOthersAccount', 'viewOwnProfile', 'viewOthersProfile', 'viewOwnPosts', 'viewOthersPosts', 'viewOwnComments', 'viewOthersComments'],
    write: ['write', 'create', 'edit', 'update', 'delete', 'publish', 'unpublish','block', 'unblock', 'subscribe', 'unsubscribe', 'deleteAccount'],
    update: ['update', 'edit', 'block', 'unblock', 'verify', 'subscribe', 'deleteAccount'],
    delete: ['delete', 'deleteAccount'],
  },
};

// Get role permissions
export function getRolePermissions(role) {
  return rolePermissions[role] || {};
}