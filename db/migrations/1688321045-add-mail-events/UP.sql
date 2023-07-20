-- UP migration file for migration 1688321045-add-mail-events 

CREATE TABLE mail_events(
    pk_mail_event_id INT GENERATED ALWAYS AS IDENTITY,
    schedulet_at TIMESTAMPTZ NOT NULL,
    -- this is the most simple way to store it
    content JSON NOT NULL,
    has_been_send BOOLEAN DEFAULT FALSE,
    has_been_rescheduled BOOLEAN DEFAULT FALSE
);