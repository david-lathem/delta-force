import { EmbedBuilder, TimestampStyles } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import config from "../../config.json" with { type: "json" };
import { parseHourToTimestamp } from "../utils/date.js";

export default {
  name: "map",
  description: "Check out map rotation",
  execute: async (interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("🗺️ Current Map Rotations")
      .setColor("Red")
      .setThumbnail(interaction.guild?.iconURL() ?? null);

    let curMap: { name: string }[] = [{ name: "None" }];

    const curHour = new Date().getUTCHours();
    let end, start;

    const fields = [];

    for (const [timeRange, maps] of Object.entries(config)) {
      const [startHour, endHour] = timeRange.split("-");

      const startTimestamp = parseHourToTimestamp(
        startHour,
        TimestampStyles.ShortTime
      );
      const endTimestamp = parseHourToTimestamp(
        endHour,
        TimestampStyles.ShortTime
      );

      if (Number(startHour) === curHour || Number(endHour) === curHour) {
        start = startTimestamp;
        end = endTimestamp;
        curMap = maps;
      }
      if (Number(startHour) <= curHour) continue;

      fields.push({
        name: `${startTimestamp} - ${endTimestamp}`,
        value: maps.map((map) => `> ${map.name}`).join("\n"),
        inline: false,
      });
    }

    embed.setFields(fields);
    embed.setDescription(
      `Current Rotation (${start} - ${end}):\n ${curMap.map((map) => `> ${map.name}`).join("\n")}`
    );

    await interaction.reply({ embeds: [embed] });
  },
} satisfies extendedAPICommand;
