<?php


namespace App\Service;


use App\Service\Manager\ObjectManager;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

/**
 * Class EmailSender
 *
 * This class is responsible for the email sending service,
 * provided in the website.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
class EmailSender
{
    private $helper;
    private $mailer;
    private $email;

    public function __construct(ApiHelper $helper, MailerInterface $mailer)
    {
        $this->helper = $helper;
        $this->mailer = $mailer;
    }

    public function sendEmailMessage(Request $request)
    {
        if (!$this->helper->validateRequest(["subject", "sender", "body", "name"], $request)) {
            return $this->helper->prepareForErrorResponse(ObjectManager::MISSING_DATA);
        }

        $subject = $request->request->get("subject");
        $senderEmail = $request->request->get("sender");
        $mailBody = $request->request->get("body");
        $senderName = $request->request->get("name");

        $message = (new Email())
            ->from($senderEmail)
            ->to($this->email)
            ->subject($subject)
            ->text("От $senderName \n с имейл $senderEmail",
        $mailBody);
        dd($message);
        try {
            $this->mailer->send($message);
        } catch (TransportExceptionInterface $e) {
            return $this->helper->prepareForErrorResponse(ObjectManager::UNEXPECTED_ERROR);
        }

        return $this->helper->prepareForSuccessResponse([
            "status" => ObjectManager::META_SUCCESS
        ]);
    }

    public function setMail($email)
    {
        $this->email = $email;
    }
}