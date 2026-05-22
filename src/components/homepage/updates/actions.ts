'use server';

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return { error: 'Please enter a valid email address' };
  }

  const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
  const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

  if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
    console.error('Klaviyo API Key or List ID is missing');
    return { error: 'Newsletter configuration is incomplete' };
  }

  try {
    const response = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'accept': 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        'revision': '2024-02-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email: email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: 'SUBSCRIBED'
                        }
                      }
                    }
                  }
                }
              ]
            }
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: KLAVIYO_LIST_ID
              }
            }
          }
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Klaviyo API error:', errorData);
      return { error: 'Failed to subscribe. Please try again later.' };
    }

    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
