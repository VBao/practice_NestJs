import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Setting } from '../settings/settings.entity';

@Entity('Attributes')
export class Attribute {
  @PrimaryColumn({ name: 'Code', type: 'varchar', length: 2 })
  code: string;

  @Column({ name: 'Description', type: 'varchar', length: 80 })
  description: string;

  @Column({ name: 'ShortName', type: 'varchar', length: 40 })
  shortName: string;

  @Column({ name: 'Parent', type: 'varchar', length: 2, nullable: true })
  parent: string;

  @Column({ name: 'EffectiveDate', type: 'timestamp' })
  effectiveDate: Date;

  @Column({ name: 'ValidUntil', type: 'timestamp', nullable: true })
  validUntil: Date;

  @ManyToOne(() => Setting, (setting) => setting.attributes)
  @JoinColumn({ name: 'SettingId' })
  setting: Setting;

  constructor(
    code?: string,
    description?: string,
    shortName?: string,
    parent?: string,
    effectiveDate?: Date,
    validUntil?: Date,
    setting?: Setting,
  ) {
    this.code = code;
    this.description = description;
    this.shortName = shortName;
    this.parent = parent;
    this.effectiveDate = effectiveDate;
    this.validUntil = validUntil;
    this.setting = setting;
  }
}
