import { DbDiscordMember, DbDiscordUser } from "../../../dbSpec.ts";
import { validator as usersUpsertValidator } from "../../../users/[userId]/upsert.ts";
import { validator as membersUpsertValidator } from "./[memberId]/upsert.ts";

export const validateUserUpsert = (user: DbDiscordUser) => {
  const failedUserValidation = Object.entries(
    usersUpsertValidator(user ?? {})
  ).find(([_, validation]) => validation.getFailed());

  if (failedUserValidation) {
    const [key, validator] = failedUserValidation;
    const [error] = validator.getErrors();
    return `Error at member.user.${key} - ${error}`;
  }
};

export const validateMembers = (members: DbDiscordMember[]) => {
  for (const memberIndex in members) {
    const member = members[parseInt(memberIndex)];

    const failedMemberValidation = Object.entries(
      membersUpsertValidator(member)
    ).find(([_, validation]) => validation.getFailed());

    if (failedMemberValidation) {
      const [key, validator] = failedMemberValidation;
      const [error] = validator.getErrors();
      return `Error at guild.members[${memberIndex}].${key} - ${error}`;
    }
  }
};
