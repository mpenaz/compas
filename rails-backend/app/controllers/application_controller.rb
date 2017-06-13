class ApplicationController < ActionController::API
  before_action :retrieve_user_from_token
  attr_reader :current_user



  def retrieve_token
    token = request.headers['HTTP_AUTHORIZATION']
    value = token.split(' ')
    return value[1]
  end

  def decode_token_unsigned(token)
    decoded_token = JWT.decode token, nil, false
    return decoded_token
  end

  def decode_token_hmac(token)
    decoded_token = JWT.decode(token, JWT.base64url_decode(@public_key), true, { :algorithm => 'HS256'})
    return decoded_token
  end

  def decode_token(token)
    decoded_token = JWT.decode token, @@hmac_secret, true, { :algorithm => 'HS256' }
    return decoded_token
  end

  def retrieve_user_from_token
    decoded_token = decode_token_unsigned(retrieve_token)
    payload = decoded_token[0]
    email = payload['email']
    @current_user = User.find_by_email(email)
  end

  @hmac_secret = 'my$ecretK3y'
  @public_key = 'qwertyuiopasdfghjklzxcvbnm123456'
end
