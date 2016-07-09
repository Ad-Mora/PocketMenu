from django import forms


class ContactUsForm(forms.Form):
    name = forms.CharField(required=False, widget=forms.TextInput(attrs={'class': 'text-input-field'}))
    email = forms.EmailField(required=False, widget=forms.TextInput(attrs={'class': 'text-input-field'}))
    message = forms.CharField(widget=forms.Textarea(attrs={'class': 'message-area'}))


