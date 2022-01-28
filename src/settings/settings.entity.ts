import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Attribute } from '../attributes/attributes.entity';

@Entity('Settings')
export class Setting {
  @PrimaryColumn({ name: 'AttributeId', type: 'varchar', length: 5 })
  attributeId: string;

  @Column({ name: 'AttributeName', type: 'varchar', length: 30 })
  attributeName: string;

  @Column({ name: 'Description', type: 'varchar', length: 40 })
  description: string;

  @Column({ name: 'IsDistributorAttribute', type: 'boolean' })
  isDistributorAttribute: boolean;

  @Column({ name: 'IsCustomerAttribute', type: 'boolean' })
  isCustomerAttribute: boolean;

  @Column({ name: 'Used', type: 'boolean' })
  used: boolean;

  @OneToMany(() => Attribute, (attribute) => attribute.setting)
  attributes: Attribute[];

  constructor(
    attributeId?: string,
    attributeName?: string,
    description?: string,
    isDistributorAttribute?: boolean,
    isCustomerAttribute?: boolean,
    used?: boolean,
  ) {
    this.attributeId = attributeId;
    this.attributeName = attributeName;
    this.description = description;
    this.isDistributorAttribute = isDistributorAttribute;
    this.isCustomerAttribute = isCustomerAttribute;
    this.used = used;
  }
}
