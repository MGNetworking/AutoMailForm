/**/
SELECT
    NOW ();

/*Changer l'heures sur le BD email */
ALTER DATABASE email
SET
    timezone TO 'UTC';

/* La list des mails*/
SELECT
    id,
    fournisseur,
    destinataire,
    expediteur,
    sujet,
    message,
    status,
    response,
    message_id,
    accepted,
    rejected,
    envelope,
    created
FROM
    automailform.email_logs;