import User from '../../models/User.js';

const isProfileFullyComplete = (user) => {
  const required = ['college', 'branch', 'year', 'expectedGraduation', 'skills', 'github', 'linkedin', 'bio', 'preferredRole'];
  for (const field of required) {
    if (!user[field] || (Array.isArray(user[field]) && user[field].length === 0)) return false;
  }
  return true;
};

export const generateDiscordInvite = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (!isProfileFullyComplete(user)) {
    throw new Error('Complete your full profile (all links required) to unlock the War Room');
  }

  if (user.discordInviteGenerated && user.discordInviteLink) {
    // Invite already generated — check if used
    if (user.discordInviteUsedAt) {
      throw new Error('Your invite link has already been used');
    }
    return { inviteLink: user.discordInviteLink };
  }

  // Generate single-use Discord invite via bot API
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.DISCORD_INVITE_CHANNEL_ID;

  if (!botToken || !channelId) {
    throw new Error('Discord not configured yet. Contact admin.');
  }

  const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/invites`, {
    method: 'POST',
    headers: {
      Authorization: `Bot ${botToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      max_uses: 1,
      max_age: 604800, // 7 days
      unique: true,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Discord invite error:', err);
    throw new Error('Failed to generate Discord invite');
  }

  const data = await response.json();
  const inviteLink = `https://discord.gg/${data.code}`;

  user.discordInviteGenerated = true;
  user.discordInviteLink = inviteLink;
  await user.save();

  return { inviteLink };
};

export const markInviteUsed = async (userId) => {
  await User.findByIdAndUpdate(userId, { discordInviteUsedAt: new Date() });
};
