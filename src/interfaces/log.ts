export interface LogRow {
  id: number;
  guildId: string;
  roleId: string;
  memberId: string;
  datetime: Date;
  addOrRemove: boolean;
}