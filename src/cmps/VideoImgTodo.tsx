import React, { useEffect, useState } from 'react'
import { Embed, Input, Form, Image } from 'semantic-ui-react'
import { BrokenUrlMsg } from './BrokenUrlMsg'
import { useForm } from '../services/customHooks'

interface VideoImgTodoProps {
    url: string,
    onNewUrl(txt: string, isDebounce?: boolean): void,
    placeholder: string,
    isNewTxt: boolean,
    type: string,
    isNewTodo: boolean
}

export const VideoImgTodo: React.FC<VideoImgTodoProps> = ({ url, onNewUrl, placeholder, isNewTxt, type, isNewTodo }) => {
    const [newUrl, handleChange] = useForm({ txt: '' });
    useEffect(() => {
        newUrl.txt = '';
        setIsError(false);
    }, [url])

    function extractVideoId(): string | null {
        try {
            if (!url) {
                return
            }
            let videoid = url.split('v=')[1];
            const ampersandPosition = videoid.indexOf('&');
            videoid = videoid.substring(0, ampersandPosition);
            return videoid;

        }
        catch {
            return null
        }
    }
    function onSendNewUrl(): void {
        onNewUrl(newUrl.txt, false);
    }
    function onComposeNewTodo(event): void {
        handleChange(event)
        onNewUrl(event.target.value, false);

    }
    const [isImgError, setIsError] = useState(false);
    if (isNewTodo && isNewTxt) {
        return (
            <Form >
                <Input name='txt' placeholder={placeholder} onChange={onComposeNewTodo}  value={newUrl.txt} />
            </Form>
        )
    }
    if (isNewTxt) {
        return (
        <Form onSubmit={onSendNewUrl}>
            <Input name='txt' placeholder={placeholder} onChange={handleChange} value={newUrl.txt} />
        </Form>
    )}

    if ((!extractVideoId() && type === 'video')) return <BrokenUrlMsg cmpType={'video'} />
    if ((type === 'img' && isImgError)) return <BrokenUrlMsg cmpType={'image'} />
    if (type === 'img') return (
        <Image onError={() => setIsError(true)} src={url} alt="" />
    )

    if (type === 'video') return (
        <Embed
            id={extractVideoId()} source="youtube" />
    )
}
