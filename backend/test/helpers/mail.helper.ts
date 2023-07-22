export function getVerifyTokenFromMail(mailcontent: string) {
  // Extract verify token from query param within the html of the mail
  return mailcontent.match(RegExp(/(?<=token=)(?<token>.*(?=[("|&))]))/gm))[0]
}
