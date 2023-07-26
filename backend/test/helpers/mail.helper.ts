export function getTokenFromMail(mailcontent: string) {
  // Extract token from query param within the html of the mail
  return mailcontent.match(RegExp(/(?<=token=)(?<token>.*(?=[("|&))]))/gm))[0]
}

export function getMailUsedTemplate(mailcontent: string) {
  // Find the template type given in the meta tag in the html
  return mailcontent.match(
    RegExp(/(?<=\<meta template=")(?<token>.*(?=["]))/gm),
  )[0]
}
