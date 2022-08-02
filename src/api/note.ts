export enum NoteStatus {
  IDLE,
  SENDING,
  ERROR,
  SENT,
}

export const submitNote = async ({
  userId,
  apiToken,
  note,
}: {
  userId: string;
  apiToken: string;
  note: string;
}) => {
  let user;

  try {
    user = await fetch(
      `https://62e845a493938a545be39903.mockapi.io/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${apiToken}`,
        },
        body: JSON.stringify({
          id: userId,
          note,
        }),
      }
    );
  } catch (e) {
    throw new Error("Error sending note");
  }

  return user;
};
