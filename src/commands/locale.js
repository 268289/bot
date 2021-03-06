const Command = require('../lib/structures/Command');

class Locale extends Command {
  constructor(client) {
    super(client, {
      name: 'locale',
      description: 'Set your language.',
      category: 'System',
      usage: 'locale [language]',
      aliases: ['lang', 'languages']
    });
  }

  async run(message, args, level) {
    const userSettings = await this.client.userSettings.get(message.author.id);
    const key = 'locale';

    if (args.length < 1) {
      return message.reply(`your locale is currently set to \`${userSettings.locale}\`.`);
    } else {
      const arg = args.join(' ');
      const { locales } = require('../lib/languages/master.json');
      
      const validLocale = locales.find(lang => {
        for (const val in lang)
          if (lang[val].toLowerCase() === arg.toLowerCase())
            return lang;
      });

      if (!validLocale) return message.reply(`The locale \`${arg}\` is not a valid locale. Please check your spelling and try again.`);

      userSettings[key] = validLocale.longcode;
      await this.client.userSettings.set(message.author.id, userSettings);

      return message.reply(`I've set your locale to \`${arg}\`.`);
    }
  }
}

module.exports = Locale;