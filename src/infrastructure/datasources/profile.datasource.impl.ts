import { ProfileDatasource } from "../../domain/datasources/profile.datasource";
import {
  CreateProfileDto,
  UpdateProfileDto,
} from "../../domain/dtos/schemas/profile";
import { ProfileEntity } from "../../domain/entities/profile.entity";
import { prisma } from "../db/prisma";

export class profileDatasourceImpl implements ProfileDatasource {
  async createProfile(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    const newProfile = await prisma.profile.create({ data: createProfileDto });
    return ProfileEntity.fromObj(newProfile);
  }

  async updateProfile(
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const profile = await prisma.profile.update({
      where: {
        id: updateProfileDto.id,
      },
      data: updateProfileDto.values,
    });

    if (!profile) {
      throw new Error("No se pudo actualizar el perfil");
    }
    return ProfileEntity.fromObj(profile);
  }

  async getAllProfiles(): Promise<ProfileEntity[]> {
    const allProfiles = await prisma.profile.findMany();
    return allProfiles.map((profile) => ProfileEntity.fromObj(profile));
  }

  async deleteProfile(profileId: string): Promise<ProfileEntity> {
    const deletedProfile = await prisma.profile.delete({
      where: { id: profileId },
    });
    return ProfileEntity.fromObj(deletedProfile);
  }
}
