import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {
  UpdateProfilePayload,
  useUpdateUserProfile,
} from '@app/web-player/user-profile/requests/use-update-user-profile';
import {useForm} from 'react-hook-form';
import {User} from '@common/auth/user';
import {Form} from '@common/ui/forms/form';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ProfileLinksForm} from '@app/admin/artist-datatable-page/artist-form/profile-links-form';

interface Props {
  user: User;
}
export function EditProfileDialog({user}: Props) {
  const {close, formId} = useDialogContext();
  const form = useForm<UpdateProfilePayload>({
    defaultValues: {
      user: {
        username: user.username,
        avatar: user.avatar,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      profile: {
        city: user.profile?.city,
        country: user.profile?.country,
        description: user.profile?.description,
      },
      links: user.links,
    },
  });
  const updateProfile = useUpdateUserProfile(form);
  return (
    <Dialog size="xl">
      <DialogHeader>
        <Trans message="Edit your profile" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values =>
            updateProfile.mutate(values, {onSuccess: () => close()})
          }
        >
          <FileUploadProvider>
            <div className="md:flex items-start gap-30">
              <FormImageSelector
                label={<Trans message="Avatar" />}
                name="user.avatar"
                diskPrefix="avatars"
                variant="square"
                previewSize="w-200 h-200"
                className="max-md:mb-20"
              />
              <div className="flex-auto">
                <FormTextField
                  name="user.username"
                  label={<Trans message="Username" />}
                  className="mb-24"
                />
                <div className="flex items-center gap-24">
                  <FormTextField
                    name="user.first_name"
                    label={<Trans message="First name" />}
                    className="flex-auto mb-24"
                  />
                  <FormTextField
                    name="user.last_name"
                    label={<Trans message="Last name" />}
                    className="flex-auto mb-24"
                  />
                </div>
                <div className="flex items-center gap-24">
                  <FormTextField
                    name="profile.city"
                    label={<Trans message="City" />}
                    className="flex-auto mb-24"
                  />
                  <FormTextField
                    name="profile.country"
                    label={<Trans message="Country" />}
                    className="flex-auto mb-24"
                  />
                </div>
                <FormTextField
                  name="profile.description"
                  label={<Trans message="Description" />}
                  inputElementType="textarea"
                  rows={4}
                />
              </div>
            </div>
            <div className="mt-24">
              <div className="mb-16 pb-16 border-b">
                <Trans message="Your links" />
              </div>
              <ProfileLinksForm />
            </div>
          </FileUploadProvider>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          type="button"
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          type="submit"
          variant="flat"
          color="primary"
          disabled={updateProfile.isLoading}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
